<template>
  <div class="about">
    <title-area :title="'Über uns'"></title-area>
    <section class="section">
      <div class="container">
        <div class="content">
          <h3 class="title is-3">
            Wer wir sind
            <span class="icon is-size-2 ml-3 has-text-primary"><i class="fa-solid fa-people-group"></i></span>
          </h3>
          <p>
            Wir arbeiten als Testintegration-Team bei POS-Solutions beim Migros-Genossenschafts-Bund und sind
            für die Qualitätssicherung von Point-of-Sale- und Backoffice-Lösungen verantwortlich. Dabei ist unser
            Aufgabenfeld sehr breit, sodass wir auf einen möglichst guten Know-How-Transfer angewiesen sind.
            Deshalb möchten wir bei POS-Solutions ein Learning-Management-System einführen, dass von Manuel Gut
            im Rahmen seiner Bachelor-Arbeit and der Hochschule Luzern entwickelt wird. Auftraggeber ist Urs Küng
            (Product Owner Testintegration).
          </p>
        </div>
        <hr>
        <div class="content">
          <h3 class="title is-3">
            Unsere Mission
            <span class="icon is-size-2 ml-2 has-text-primary"><i class="fa-solid fa-bullseye"></i></span>
          </h3>
          <img :src="require('@/assets/pictures/goal.png')" alt="Projektziel">
        </div>
        <hr>
        <div class="content">
          <h3 class="title is-3">
            Kontakt
            <span class="icon is-size-2 ml-2 has-text-primary"><i class="fa-solid fa-envelope"></i></span>
          </h3>
          <p>
            Manuel Gut: <span class="icon is-size-6 ml-2 has-text-primary"><i
              class="fa-solid fa-envelope"></i></span>
          </p>
          <p>
            Urs Küng: <span class="icon is-size-6 ml-2 has-text-primary"><i
              class="fa-solid fa-envelope"></i></span>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import TitleArea from "@/components/TitleArea";

export default {
  components: {TitleArea}
}
</script>
