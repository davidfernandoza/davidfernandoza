<template>
	<div class="sidebar">
		<div class="d-flex flex-column flex-shrink-0 text-white bg-dark sidebar__container">
			<div class="sidebar__logo">
				<a href="/"
					class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none sidebar__logo-content">
					<svg class="bi me-2 sidebar__logo" width="40" height="32">
						<use xlink:href="#bootstrap"></use>
					</svg>
					<span class="fs-4 sidebar__logo-title">Admin Page</span>
				</a>
			</div>
			<hr>
			<ul class="nav nav-pills flex-column mb-auto sidebar__menu">
				<li class="sidebar__menu-item">
					<RouterLink to="/admin" class="nav-link text-white">
						<i class="fas fa-chart-line fa-lg pe-3"></i>
						Dashboard
					</RouterLink>
				</li>
				<li class="sidebar__menu-item">
					<RouterLink to="/admin/users" class="nav-link text-white">
						<i class="fas fa-users fa-xl pe-2"></i>
						Users
					</RouterLink>
				</li>
				<li class="sidebar__menu-item">
					<RouterLink to="/admin/skills" class="nav-link text-white">
						<i class="fas fa-list fa-xl pe-3"></i>
						Skills
					</RouterLink>
				</li>
			</ul>
			<hr>
			<div class="dropdown sidebar__footer">
				<a href="#"
					class="d-flex align-items-center text-white text-decoration-none dropdown-toggle sidebar__footer-avatar"
					id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
					<strong>David Torres </strong> &nbsp <small> (admin)</small>
				</a>
				<ul class="dropdown-menu dropdown-menu-dark text-small shadow sidebar__footer-menu"
					aria-labelledby="dropdownUser1" style="">
					<li class="sidebar__footer-menu-item">
						<RouterLink to="/" class="dropdown-item">Home</RouterLink>
					</li>

					<li class="sidebar__footer-menu-item">
						<RouterLink to="/admin/profile" class="dropdown-item">Profile</RouterLink>
					</li>
					<li>
						<hr class="dropdown-divider">
					</li>
					<li class="sidebar__footer-menu-item"><button class="dropdown-item">Logout</button></li>
				</ul>
			</div>
		</div>
	</div>

</template>