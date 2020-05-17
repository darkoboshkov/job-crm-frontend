<template>
  <div id="page_matching_details" class="dashboard-content">
    <h1 class="title">
      {{ $t("page_matching_detail.title") }}
    </h1>
    <div class="mt-5 row">
      <div class="matching-list col-5">
        <div class="matching-item">
          <div class="up">
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-2"
              style="width:65px"
            />
            <div>Parttime Magazijnmed</div>
            <div>Kruidvat</div>
            <div class="icon-group">
              <div class="icon">
                <img src="@/assets/image/phone.svg" />
              </div>
              <div class="icon">
                <img src="@/assets/image/message.svg" />
              </div>
            </div>
          </div>
          <div class="down">
            <ul>
              <li>12-24 uur</li>
              <li>Regio Arnhem</li>
              <li>Vanaf januari 2020</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-2 d-flex justify-content-center">
        <img src="@/assets/image/matching.svg" />
      </div>

      <div class="matching-list col-5">
        <div class="matching-item">
          <div class="up">
            <img
              src="@/assets/image/avatar_nick.png"
              class="rounded-circle border mr-2"
              style="width:65px"
            />
            <div>Magalie Lindeboom</div>
            <div>Visual Designer</div>
            <div class="icon-group">
              <div class="icon">
                <img src="@/assets/image/phone.svg" />
              </div>
              <div class="icon">
                <img src="@/assets/image/message.svg" />
              </div>
            </div>
          </div>
          <div class="down">
            <ul>
              <li>35 jaar</li>
              <li>Arnhem</li>
              <li>Group</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="splitter"></div>

    <div>
      <h2>Match informatie</h2>

      <div class="row">
        <div class="col-md-3 d-flex">
          <div class="info-card">
            <div class="title">Woon-werk afstand</div>
            <div class="body">
              <div class="icon">
                <img src="@/assets/image/distance.svg" />
              </div>
              <div class="caption">
                <div class="number">25</div>
                <div class="unit">km</div>
              </div>
            </div>
            <div class="footer">
              Gemiddelde reistijd van de woon-werk afstand is
              <span class="color-red">16 minuten</span>.
            </div>
          </div>
        </div>
        <div class="col-md-3 d-flex">
          <div class="info-card">
            <div class="title">Opleidingsniveau</div>
            <div class="body">
              <div class="icon">
                <img src="@/assets/image/percent.svg" />
              </div>
              <div class="caption">
                <div class="number">100</div>
                <div class="unit">%</div>
              </div>
            </div>
            <div class="footer">
              Magalie heeft is <span class="color-red">HBO afgestudeerd</span> en
              voldoet aan de eisen.
            </div>
          </div>
        </div>
        <div class="col-md-3 d-flex">
          <div class="info-card">
            <div class="title">Beschikbaarheid</div>
            <div class="body">
              <div class="icon">
                <img src="@/assets/image/perdirect.svg" />
              </div>
              <div class="caption">
                <div class="number">Per direct</div>
                <div class="unit"></div>
              </div>
            </div>
            <div class="footer">
              Magalie Lindeboom kan meteen aan de slag gaan.
            </div>
          </div>
        </div>
        <div class="col-md-3 d-flex">
          <div class="info-card">
            <div class="title">Leeftijd</div>
            <div class="body">
              <div class="icon">
                <img src="@/assets/image/woman.svg" />
              </div>
              <div class="caption">
                <div class="number">35</div>
                <div class="unit">jaar</div>
              </div>
            </div>
            <div class="footer">
              Kandidaat heeft een
              <span class="color-red">geschikte leeftijd</span> voor de functie met
              enige ervaring.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableFilter from "@/components/common/TableFilter";

export default {
  name: "MatchDetails",
  components: { TableFilter },
  data() {
    return {};
  },
  methods: {}
};
</script>
