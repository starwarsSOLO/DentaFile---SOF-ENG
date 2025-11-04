<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$patient_id = $data['patient_id'] ?? null;
$service    = $data['service'] ?? null;
$date       = $data['date'] ?? null;
$time       = $data['time'] ?? null;

$host = "localhost";
$user = "root";
$pass = "";
$db   = "dentafile_db";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Validate input
if (!$patient_id || !$service || !$date || !$time) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Insert into appointments table
$stmt = $conn->prepare("INSERT INTO appointments (patient_id, service, date, time) VALUES (?, ?, ?, ?)");
$stmt->bind_param("isss", $patient_id, $service, $date, $time);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Service added and appointment scheduled']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save service']);
}

$stmt->close();
$conn->close();
?>
