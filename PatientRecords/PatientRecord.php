<?php
// --------------------------
// Fetch Patients Script
// --------------------------
header('Content-Type: application/json; charset=utf-8');
error_reporting(0); // Disable warnings/notices

$host = "localhost";
$user = "root";
$pass = "";
$db   = "dentafile_db";

// Connect to database
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'patients' => [], 'message' => 'Database connection failed']);
    exit;
}

// Fetch all patients
$sql = "SELECT * FROM patients ORDER BY id DESC";
$result = $conn->query($sql);

$patients = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
}

// Always return JSON
echo json_encode([
    'success' => true,
    'patients' => $patients
]);

$conn->close();

// NO closing PHP tag to prevent whitespace issues
