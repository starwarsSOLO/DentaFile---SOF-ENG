<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) throw new Exception("No input data received");

    $conn = new mysqli("localhost", "root", "", "dentafile_db");
    if ($conn->connect_error) throw new Exception("Database connection failed: " . $conn->connect_error);

    $stmt = $conn->prepare(
        "INSERT INTO patients 
        (doctor, name, surname, gender, age, birthday, country, email, phone, city, medical_history, remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    if (!$stmt) throw new Exception("Prepare statement failed: " . $conn->error);

    $stmt->bind_param(
        "ssssisssssss",
        $input['doctor'],
        $input['name'],
        $input['surname'],
        $input['gender'],
        $input['age'],
        $input['birthday'],
        $input['country'],
        $input['email'],
        $input['phone'],
        $input['city'],
        $input['medical_history'],
        $input['remarks']
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Patient added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
