<script setup>
</script>

<template>
  <footer>
    <div class="footer-container">

      <!-- Redes -->
      <section class="col redes">
        <h2>Redes</h2>

        <a href="https://www.instagram.com/nutri_.vitae/" target="_blank">
          <i class="mdi mdi-instagram"></i>
          <span>@nutri_.vitae</span>
        </a>

        <a href="#">
          <i class="mdi mdi-facebook"></i>
          <span>nutriVitae</span>
        </a>
      </section>

      <!-- Centro -->
      <section class="col centro">

        <RouterLink to="/" class="logo-footer">
          <img src="/logo.png" alt="Logo">
          <h2>NutriVitae</h2>
        </RouterLink>

        <div class="direitos">
          <p>
            &copy; Alguns direitos reservados<br>
            NutriVitae
          </p>

          <p>Desenvolvido por</p>

          <div class="equipe">

            <ul>
              <li>Bianca Holanda</li>
              <li>Felipe Hodecker</li>
              <li>Kauan Gunther</li>
            </ul>

            <ul>
              <li>Mizael Estevam</li>
              <li>Ruty Liandra</li>
              <li>Sara Schulz</li>
            </ul>

          </div>

        </div>

      </section>

      <!-- Contato -->
      <section class="col contato">

        <h2>Contato</h2>

        <div class="item">
          <i class="mdi mdi-email"></i>
          <span>nutri.vitae.26@gmail.com</span>
        </div>

        <div class="item">
          <i class="mdi mdi-phone-classic"></i>
          <span>+55 (47) 9 9206-7618</span>
        </div>

      </section>

    </div>
  </footer>
</template>

<style scoped>

footer{
    background:#536236;
    padding:55px 70px;
    box-shadow:0 0 35px rgba(0,0,0,.45);
}

.footer-container{

    display:flex;
    justify-content:space-between;
    align-items:flex-start;

    max-width:1400px;
    margin:auto;
}

/*========================*/

.col{
    display:flex;
    flex-direction:column;
}

.col h2{
    font-size:2rem;
    font-weight:400;
    color:#F6F0DA;
    margin-bottom:35px;
}

/*========================*/
/* REDES */

.redes a{

    display:flex;
    align-items:center;
    gap:12px;

    margin-bottom:28px;

    color:#F6F0DA;
    text-decoration:none;
    font-size:1.5rem;

    transition:.3s;
}

.redes a:hover{
    opacity:.7;
}

.redes i{
    font-size:2rem;
}

/*========================*/
/* CENTRO */

.centro{
    align-items:center;
}

.logo-footer{

    display:flex;
    flex-direction:column;
    align-items:center;

    text-decoration:none;
    color:#F6F0DA;
}

.logo-footer img{

    width:90px;

    filter:drop-shadow(0 0 8px rgba(0,0,0,.35));
}

.logo-footer h2{

    margin-top:8px;
    margin-bottom:35px;

    font-size:2rem;
    font-weight:400;
}

.direitos{

    display:flex;
    flex-direction:column;
    align-items:center;

    text-align:center;
}

.direitos p{

    color:#F6F0DA;
    font-size:.75rem;

    margin-bottom:12px;
}

.equipe{

    display:flex;
    gap:45px;
}

.equipe ul{

    list-style:none;
    padding:0;
    margin:0;
}

.equipe li{

    color:#F6F0DA;
    font-size:.72rem;
    line-height:1.6;
}

/*========================*/
/* CONTATO */

.contato .item{

    display:flex;
    align-items:center;

    gap:12px;
    margin-bottom:28px;

    color:#F6F0DA;
    font-size:1.35rem;
}

.contato i{

    font-size:2rem;
}

/*========================*/

@media (max-width:900px){

.footer-container{

    flex-direction:column;
    align-items:center;
    gap:50px;
}

.redes,
.contato{

    align-items:center;
}

}

</style>