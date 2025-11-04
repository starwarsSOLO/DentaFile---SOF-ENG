<?php
// Enable full error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Check if ID is sent
if (!isset($_POST['id']) || empty($_POST['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'No patient ID provided'
    ]);
    exit;
}

$id = $_POST['id'];

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dentafile_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
    exit;
}

// Check if patient has appointments
$result = $conn->query("SELECT COUNT(*) AS cnt FROM appointments WHERE patient_id = $id");
$row = $result->fetch_assoc();
if ($row['cnt'] > 0) {
    echo json_encode([
        'success' => false,
        'message' => 'Cannot delete patient with existing appointments.'
    ]);
    exit;
}

// Prepare delete statement
$stmt = $conn->prepare("DELETE FROM patients WHERE id = ?");
if (!$stmt) {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to prepare statement: ' . $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $id);

// Execute delete
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No patient found with that ID'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Delete failed: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
