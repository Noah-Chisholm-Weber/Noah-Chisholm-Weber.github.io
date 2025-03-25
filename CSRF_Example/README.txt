This activity is intended to provide a simplified example of Cross-Site Request Forgery (CSRF).  Follow the steps.

1. Open a terminal (cmd.exe) and navigate to the php directory.


2. Launch a php local server by typing the following and pressing enter:

php -S localhost:8000


3. Open a browser (chrome.exe) and launch the "bank" website by entering the URL:

localhost:8000

This will start the banking "session".  (Assume the user credentials have been entered).


4. Next, launch the malicious website by clicking on the "cartoon character" pop-up.  (Realistically, this would be a different website on a different server, but for the purposes of this demo we will just pretend.)


5. Click to claim the free gift.  Notice how the hidden details on the form were submitted to the "bank" website for processing, taking advantage of the active session.


6. Next, fix the website by enabling the disabled code already included on the index.php and the process.php pages.  Do not forget to enable the code on the form in index.php.

The purpose of this code is to generate a random session CSRF token when the user signs into their bank.  The token is sent as session data on the form when the transfer is made.  On the server (process.php), the token is verified from this session data.  If the token does not exist, or the token does not match, the transfer is cancelled and an error message is displayed.


7. Try making a legitimate transfer from the bank website.  It should go through.


8. Next try making a transfer from the malicious website.  It should be blocked.