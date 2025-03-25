<?php	
	session_start();

	# TODO: Generate random session CSRF token
	 if (!isset($_SESSION['csrf_token'])) {
	 	$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank Transfer</title>
</head>
<body>
    <h2>Bank Transfer</h2>
    <p>Welcome, User! Transfer money below.</p>
    <form action="process.php" method="POST">
        <label>Amount: $</label>
        <input type="number" name="amount"><br><br>
        <label>To Account:</label>
        <input type="text" name="to"><br><br>
        <input type="submit" value="Transfer Money">
		<!-- TODO: Send hidden CSRF token with form data for comparison -->
		
		<input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
		
    </form>
	
	<p>Pop-up from out sponser!</p>
	<a href='fun_survey.html' target='_blank'>Which cartoon character are you?</a>
</body>
</html>
