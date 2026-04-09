"use strict";

const JPDB_BASE_URL = "http://api.login2explore.com:5577";
const JPDB_IRL = "/api/irl";
const JPDB_IML = "/api/iml";

const JPDB_CONN_TOKEN = "90934791|-31949238525520661|90958144";
const JPDB_DB_NAME = "SCHOOL-DB";
const JPDB_REL_NAME = "STUDENT-TABLE";

let currentRecNo = null;

function setStatus(message, type) {
    const statusNode = $("#statusMsg");
    statusNode.text(message || "");
    statusNode.removeClass("error success info");

    if (message) {
        statusNode.addClass(type || "info");
    }
}

function setDataFieldsEnabled(enabled) {
    $("#fullName").prop("disabled", !enabled);
    $("#studentClass").prop("disabled", !enabled);
    $("#birthDate").prop("disabled", !enabled);
    $("#address").prop("disabled", !enabled);
    $("#enrollmentDate").prop("disabled", !enabled);
}

function clearFormDataOnly() {
    $("#fullName").val("");
    $("#studentClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");
}

function setInitialState(message, statusType) {
    currentRecNo = null;

    $("#rollNo").val("").prop("disabled", false);
    clearFormDataOnly();
    setDataFieldsEnabled(false);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);

    setStatus(message || "Enter Roll-No to fetch or create a record.", statusType || "info");
    $("#rollNo").focus();
}

function getRollNoJsonObj() {
    return JSON.stringify({
        "Roll-No": $("#rollNo").val().trim()
    });
}

function getStudentJsonObj() {
    return JSON.stringify({
        "Roll-No": $("#rollNo").val().trim(),
        "Full-Name": $("#fullName").val().trim(),
        "Class": $("#studentClass").val().trim(),
        "Birth-Date": $("#birthDate").val(),
        "Address": $("#address").val().trim(),
        "Enrollment-Date": $("#enrollmentDate").val()
    });
}

function executeSyncRequest(requestData, endpoint) {
    $.ajaxSetup({ async: false });
    const response = executeCommandAtGivenBaseUrl(requestData, JPDB_BASE_URL, endpoint);
    $.ajaxSetup({ async: true });
    return response;
}

function parseDataFromResponse(resJsonObj) {
    if (!resJsonObj || !resJsonObj.data) {
        return null;
    }

    if (typeof resJsonObj.data === "object") {
        return resJsonObj.data;
    }

    try {
        return JSON.parse(resJsonObj.data);
    } catch (error) {
        return null;
    }
}

function fillFormFromRecord(record) {
    $("#fullName").val(record["Full-Name"] || "");
    $("#studentClass").val(record["Class"] || "");
    $("#birthDate").val(record["Birth-Date"] || "");
    $("#address").val(record["Address"] || "");
    $("#enrollmentDate").val(record["Enrollment-Date"] || "");
}

function validateForm() {
    const checks = [
        { id: "rollNo", label: "Roll-No" },
        { id: "fullName", label: "Full-Name" },
        { id: "studentClass", label: "Class" },
        { id: "birthDate", label: "Birth-Date" },
        { id: "address", label: "Address" },
        { id: "enrollmentDate", label: "Enrollment-Date" }
    ];

    for (let i = 0; i < checks.length; i += 1) {
        const check = checks[i];
        const value = $("#" + check.id).val();
        if (!value || (typeof value === "string" && value.trim() === "")) {
            setStatus(check.label + " cannot be empty.", "error");
            $("#" + check.id).focus();
            return false;
        }
    }

    return true;
}

function prepareForCreate() {
    clearFormDataOnly();
    setDataFieldsEnabled(true);
    $("#rollNo").prop("disabled", false);

    $("#saveBtn").prop("disabled", false);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", false);

    setStatus("Roll-No not found. Enter details and click Save.", "info");
    $("#fullName").focus();
}

function prepareForUpdate(recordData, recNo) {
    currentRecNo = recNo;

    fillFormFromRecord(recordData);
    setDataFieldsEnabled(true);
    $("#rollNo").prop("disabled", true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", false);
    $("#resetBtn").prop("disabled", false);

    setStatus("Record found. Modify details and click Update.", "info");
    $("#fullName").focus();
}

function checkRollNoAndLoad(showEmptyError) {
    const rollNo = $("#rollNo").val().trim();

    if (!rollNo) {
        if (showEmptyError) {
            setStatus("Roll-No is required.", "error");
            $("#rollNo").focus();
        }
        setDataFieldsEnabled(false);
        $("#saveBtn").prop("disabled", true);
        $("#updateBtn").prop("disabled", true);
        $("#resetBtn").prop("disabled", true);
        return;
    }

    const getRequest = createGET_BY_KEYRequest(
        JPDB_CONN_TOKEN,
        JPDB_DB_NAME,
        JPDB_REL_NAME,
        getRollNoJsonObj()
    );

    const resJsonObj = executeSyncRequest(getRequest, JPDB_IRL);

    if (resJsonObj.status === 400) {
        currentRecNo = null;
        prepareForCreate();
        return;
    }

    if (resJsonObj.status === 200) {
        const data = parseDataFromResponse(resJsonObj);
        if (!data || !data.record || data.rec_no === undefined || data.rec_no === null) {
            setStatus("Unable to parse fetched data. Try again.", "error");
            return;
        }
        prepareForUpdate(data.record, data.rec_no);
        return;
    }

    setStatus("Error while checking Roll-No. Please try again.", "error");
}

function saveRecord() {
    if (!validateForm()) {
        return;
    }

    const putRequest = createPUTRequest(
        JPDB_CONN_TOKEN,
        getStudentJsonObj(),
        JPDB_DB_NAME,
        JPDB_REL_NAME
    );

    const resJsonObj = executeSyncRequest(putRequest, JPDB_IML);

    if (resJsonObj.status === 200) {
        setInitialState("Record saved successfully.", "success");
        return;
    }

    setStatus("Save failed. Please verify data and try again.", "error");
}

function updateRecord() {
    if (!validateForm()) {
        return;
    }

    if (currentRecNo === null) {
        setStatus("Record number missing. Re-enter Roll-No.", "error");
        setInitialState("Re-enter Roll-No to continue.", "error");
        return;
    }

    const updateRequest = createUPDATERecordRequest(
        JPDB_CONN_TOKEN,
        getStudentJsonObj(),
        JPDB_DB_NAME,
        JPDB_REL_NAME,
        currentRecNo
    );

    const resJsonObj = executeSyncRequest(updateRequest, JPDB_IML);

    if (resJsonObj.status === 200) {
        setInitialState("Record updated successfully.", "success");
        return;
    }

    setStatus("Update failed. Please try again.", "error");
}

$(document).ready(function () {
    setInitialState();

    $("#rollNo").on("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkRollNoAndLoad(true);
        }
    });

    $("#rollNo").on("blur", function () {
        if (!$("#rollNo").prop("disabled")) {
            checkRollNoAndLoad(false);
        }
    });

    $("#saveBtn").on("click", function () {
        saveRecord();
    });

    $("#updateBtn").on("click", function () {
        updateRecord();
    });

    $("#resetBtn").on("click", function () {
        setInitialState();
    });
});