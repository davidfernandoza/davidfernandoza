<template>

	<!-- Main -->
	<main class="main min-vh-100">
		<section class="container">
			<section class="d-flex flex-wrap pt-4 row">

				<!-- Cards -->
				<div class="col-12 col-md-6 d-flex justify-content-between">
					<div class="card load-card" aria-hidden="true" v-for="index in 3" :key="index">
						<svg class="bd-placeholder-img card-img-top" width="100%" height="120" xmlns="http://www.w3.org/2000/svg"
							role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
							<rect width="100%" height="100%" fill="#868e96"></rect>
						</svg>
						<div class="card-body">
							<h5 class="card-title placeholder-glow">
								<span class="placeholder col-12"></span>
							</h5>
							<p class="card-text placeholder-glow">
								<span class="placeholder col-7"></span>
								<span class="placeholder col-4"></span>
								<span class="placeholder col-3"></span>
								<span class="placeholder col-6"></span>
								<span class="placeholder col-8"></span>
							</p>
							<a class="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
						</div>
					</div>
				</div>

				<!-- Sections -->
				<div class="container mt-2 col-12 col-md-6">
					<p class="placeholder-glow">
						<span class="placeholder col-5"></span>
						<span class="placeholder col-12"></span>
						<span class="placeholder col-3"></span>
						<span class="placeholder col-4"></span>
						<span class="placeholder col-7"></span>
						<span class="placeholder col-6"></span>
					</p>
					<div class="card">
						<p class="placeholder-glow card-body">
							<span class="placeholder col-5"></span>
							<span class="placeholder col-8"></span>
							<span class="placeholder col-6"></span>
							<span class="placeholder col-7"></span>
							<span class="placeholder col-12"></span>
						</p>
					</div>
				</div>
			</section>

			<section class="row mt-3">
				<p class="placeholder-glow col-12">
					<span class="placeholder col-12"></span>
					<span class="placeholder col-8"></span>
					<span class="placeholder col-6"></span>
					<span class="placeholder col-7"></span>
				</p>
			</section>

			<section class="d-flex flex-wrap py-4 row">

				<!-- Sections -->
				<div class="container mt-2 col-12 col-md-6">
					<div class="card">
						<p class="placeholder-glow card-body">
							<span class="placeholder col-5"></span>
							<span class="placeholder col-8"></span>
							<span class="placeholder col-6"></span>
							<span class="placeholder col-7"></span>
							<span class="placeholder col-12"></span>
						</p>
					</div>
					<p class="placeholder-glow">
						<span class="placeholder col-5"></span>
						<span class="placeholder col-12"></span>
						<span class="placeholder col-3"></span>
						<span class="placeholder col-4"></span>
						<span class="placeholder col-7"></span>
						<span class="placeholder col-6"></span>
					</p>
				</div>

				<!-- Cards -->
				<div class="col-12 col-md-6 d-flex justify-content-between">
					<div class="card load-card" aria-hidden="true" v-for="index in 3" :key="index">
						<svg class="bd-placeholder-img card-img-top" width="100%" height="120" xmlns="http://www.w3.org/2000/svg"
							role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
							<rect width="100%" height="100%" fill="#868e96"></rect>
						</svg>
						<div class="card-body">
							<h5 class="card-title placeholder-glow">
								<span class="placeholder col-12"></span>
							</h5>
							<p class="card-text placeholder-glow">
								<span class="placeholder col-7"></span>
								<span class="placeholder col-4"></span>
								<span class="placeholder col-3"></span>
								<span class="placeholder col-6"></span>
								<span class="placeholder col-8"></span>
							</p>
							<a class="btn btn-secondary disabled placeholder col-6" aria-disabled="true"></a>
						</div>
					</div>
				</div>
			</section>
		</section>
	</main>

</template>
