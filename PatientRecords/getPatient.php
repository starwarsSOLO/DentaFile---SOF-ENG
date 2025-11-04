<?php
header('Content-Type: application/json');

$patient_id = $_GET['id'] ?? null;

if (!$patient_id) {
    echo json_encode(['success' => false, 'message' => 'Patient ID not provided']);
    exit;
}

// Database connection
$host = "localhost";
$user = "root";
$pass = "";
$db   = "dentafile_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM patients WHERE id = ?");
$stmt->bind_param("i", $patient_id);
$stmt->execute();
$result = $stmt->get_result();
$patient = $result->fetch_assoc();

if ($patient) {
    echo json_encode(['success' => true, 'patient' => $patient]);
} else {
    echo json_encode(['success' => false, 'message' => 'Patient not found']);
}

$stmt->close();
$conn->close();
?>
