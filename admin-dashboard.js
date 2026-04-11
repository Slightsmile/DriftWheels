// No login required, dashboard always accessible
var pendingCars = JSON.parse(localStorage.getItem('pendingCars') || '[]');
var approvedCars = JSON.parse(localStorage.getItem('approvedCars') || '[]');
var pendingCards = document.getElementById('pendingCards');
function renderPending() {
  pendingCards.innerHTML = '';
  for (var i = 0; i < pendingCars.length; i++) {
    var car = pendingCars[i];
    var card = document.createElement('div');
    card.className = 'post-card';
    var img = document.createElement('img');
    img.src = car.photos && car.photos[0] ? car.photos[0] : 'https://via.placeholder.com/400x250?text=No+Image';
    img.style.width = '100%';
    img.style.maxHeight = '220px';
    img.style.objectFit = 'cover';
    card.appendChild(img);
    var detailsContainer = document.createElement('div');
    detailsContainer.style.padding = '12px 0 0 0';
    var top = document.createElement('div');
    top.className = 'post-top';
    var h2 = document.createElement('h2');
    h2.className = 'post-title';
    h2.innerText = car.name;
    var price = document.createElement('div');
    price.className = 'price';
    price.innerText = 'BDT ' + car.price;
    top.appendChild(h2);
    top.appendChild(price);
    detailsContainer.appendChild(top);
    var meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = '<span class="meta-item">'+car.year+'</span> <span class="meta-item">'+car.condition+'</span> <span class="meta-item">'+car.mileage+' km</span> <span class="meta-item">'+car.fuel+'</span> <span class="meta-item">'+car.transmission+'</span> <span class="meta-item">'+car.color+'</span> <span class="meta-item">'+car.location+'</span>';
    detailsContainer.appendChild(meta);
    var desc = document.createElement('div');
    desc.className = 'desc';
    desc.innerText = car.description;
    detailsContainer.appendChild(desc);
    var user = document.createElement('div');
    user.className = 'meta';
    user.innerText = 'Posted by: ' + car.user + ' (' + car.phone + ')';
    detailsContainer.appendChild(user);
    var detailsBtn = document.createElement('a');
    detailsBtn.innerText = 'View Details';
    detailsBtn.href = 'car-details.html?pending='+i;
    detailsBtn.className = 'action-btn';
    detailsBtn.style.display = 'inline-block';
    detailsBtn.style.marginTop = '10px';
    detailsBtn.style.marginRight = '10px';
    detailsContainer.appendChild(detailsBtn);
    var approveBtn = document.createElement('button');
    approveBtn.innerText = 'Approve';
    approveBtn.className = 'action-btn';
    approveBtn.style.background = '#28a745';
    approveBtn.style.marginTop = '10px';
    approveBtn.onclick = (function(idx) {
      return function() {
        approvedCars.push(pendingCars[idx]);
        localStorage.setItem('approvedCars', JSON.stringify(approvedCars));
        pendingCars.splice(idx, 1);
        localStorage.setItem('pendingCars', JSON.stringify(pendingCars));
        renderPending();
      }
    })(i);
    detailsContainer.appendChild(approveBtn);
    card.appendChild(detailsContainer);
    pendingCards.appendChild(card);
  }
}
// Show static card for the first pending car (demo for static HTML button)
function renderStaticCard() {
  var card = document.getElementById('staticCard');
  if (!pendingCars.length) { card.style.display = 'none'; return; }
  var car = pendingCars[0];
  card.style.display = '';
  document.getElementById('staticImg').src = car.photos && car.photos[0] ? car.photos[0] : 'https://via.placeholder.com/400x250?text=No+Image';
  document.getElementById('staticTitle').innerText = car.name;
  document.getElementById('staticPrice').innerText = 'BDT ' + car.price;
  document.getElementById('staticMeta').innerHTML = '<span class="meta-item">'+car.year+'</span> <span class="meta-item">'+car.condition+'</span> <span class="meta-item">'+car.mileage+' km</span> <span class="meta-item">'+car.fuel+'</span> <span class="meta-item">'+car.transmission+'</span> <span class="meta-item">'+car.color+'</span> <span class="meta-item">'+car.location+'</span>';
  document.getElementById('staticDesc').innerText = car.description;
  document.getElementById('staticUser').innerText = 'Posted by: ' + car.user + ' (' + car.phone + ')';
  document.getElementById('staticDetails').href = 'car-details.html?pending=0';
}
var staticApproveBtn = document.getElementById('staticApprove');
if(staticApproveBtn) {
  staticApproveBtn.onclick = function() {
    if (!pendingCars.length) return;
    approvedCars.push(pendingCars[0]);
    localStorage.setItem('approvedCars', JSON.stringify(approvedCars));
    pendingCars.splice(0, 1);
    localStorage.setItem('pendingCars', JSON.stringify(pendingCars));
    renderStaticCard();
    renderPending();
  }
}
renderStaticCard();
renderPending();
function logout() {
  localStorage.removeItem('adminLoggedIn');
  window.location = 'admin-login.html';
}
window.logout = logout;
