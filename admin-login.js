// Simple admin login (username: admin, password: admin123)
document.getElementById('adminLoginForm').onsubmit = function(e) {
  e.preventDefault();
  var user = document.getElementById('adminUser').value;
  var pass = document.getElementById('adminPass').value;
  if(user === 'admin' && pass === 'admin123') {
    localStorage.setItem('adminLoggedIn', 'yes');
    window.location = 'admin-dashboard.html';
  } else {
    document.getElementById('adminLoginMsg').innerText = 'Invalid login.';
  }
};
