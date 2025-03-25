<?php
	session_start();	

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		
		# TODO: Check randomized CSRF token generated at the beginning of the session
		 if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
		 	session_destroy();
		 	die("⛔ CSRF attack detected! Request blocked.");			
		 }
		
		$amount = htmlspecialchars($_POST['amount']);
		$to = htmlspecialchars($_POST['to']);

		echo "✅ Secure transfer of $$amount to account $to completed!";	
	}
?>
