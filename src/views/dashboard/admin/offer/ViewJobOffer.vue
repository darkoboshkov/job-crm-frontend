<template>
  <b-modal
    ref="modal-view-offer"
    size="lg"
    :hide-footer="true"
    :hide-header="true"
    centered
    modal-class="modal-view-offer"
  >
    <div class="p-3">
      <div class="text-center">
        <strong>Uitzendovereenkomst Fase A</strong>
      </div>
      <br />
      <div class="text-center">
        <strong>met uitzendbeding</strong>
      </div>
      <br />
      <div>
        <strong>Werkgever, de uitzendonderneming</strong> {{ company.name }}.,
        gevestigd en kantoorhoudende te {{ company.city }} aan
        {{ company.street }} {{ company.houseNumber }},
        {{ company.postalCode }} {{ company.city }}, vertegenwoordigd door de
        {{ manager.firstName }} {{ manager.lastName }}.
        <br />
        <br />
        <strong>en</strong>
        <br />
        <br />
        <strong>Werknemer, de uitzendkracht</strong>
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">Naam</div>
        : {{ worker.firstName }} {{ worker.lastName }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Adres
        </div>
        : {{ worker.street }} {{ worker.houseNumber }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Postcode en woonplaats
        </div>
        : {{ worker.postalCode }} {{ worker.city }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Burgerservicenummer
        </div>
        : {{ worker.socialSecurityNumber }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Geboren op
        </div>
        : {{ worker.birthday }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Identificatiebewijs
        </div>
        : {{ worker.idType }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Geldig tot
        </div>
        : {{ worker.idExpirationDate }}
      </div>
      <br />
      <strong>
        verklaren hierbij een uitzendovereenkomst te zijn aangegaan voor de duur
        van de terbeschikkingstelling, onder de volgende voorwaarden.
      </strong>
      <br />
      <br />
      De uitzendonderneming zal de uitzendkracht ter beschikking stellen aan de
      hieronder genoemde opdrachtgever. De uitzendkracht zal krachtens de door
      de opdrachtgever aan de uitzendonderneming verstrekte opdracht arbeid
      verrichten onder leiding en toezicht van de opdrachtgever, conform artikel
      7: 690 BW.
      <br />
      <br />
      <div>
        <div style="width: 200px; display: inline-block;">
          Naam opdrachtgever
        </div>
        : {{ company.name }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Adres
        </div>
        : {{ company.street }} {{ company.houseNumber }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Postcode en woonplaats
        </div>
        : {{ company.postalCode }} {{ company.city }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Contactpersoon
        </div>
        : {{ manager.firstName }} {{ manager.lastName }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Telefoonnummer
        </div>
        : {{ manager.phone }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Verwachte datum aanvang werkzaamheden
        </div>
        : {{ offer.startDate }}
      </div>
      <div>
        <div style="width: 200px; display: inline-block;">
          Overeengekomen arbeidsduur
        </div>
        : {{ offer.hoursPerWeek }}
      </div>
      <br />

      <strong>Artikel 1. ABU-cao voor uitzendkrachten</strong>
      <div>
        Op deze uitzendovereenkomst is de ABU-cao voor uitzendkrachten van
        toepassing zoals te vinden op www.abu.nl. De uitzendkracht verklaart
        hierbij kennis te hebben genomen van deze CAO. De uitzendonderneming en
        de uitzendkracht zijn gehouden alle verplichtingen voortvloeiende uit
        deze CAO na te komen.
      </div>
      <br />

      <strong>Artikel 2. Aanvang van de uitzendovereenkomst</strong>
      <div>
        De uitzendovereenkomst gaat in op het tijdstip waarop de uitzendkracht
        de overeengekomen werkzaamheden daadwerkelijk aanvangt, tenzij in deze
        uitzendovereenkomst anders is overeengekomen.
      </div>
      <br />

      <strong>Artikel 3. Duur fase A</strong>
      <div>
        Deze uitzendovereenkomst fase A duurt maximaal een periode van 78
        gewerkte weken. Als deze periode is voltooid en de uitzendovereenkomst
        wordt voortgezet, of als er binnen 6 maanden een nieuwe
        uitzendovereenkomst wordt aangegaan, treedt fase B in werking.
      </div>
      <br />

      <strong>Artikel 4. Einde uitzendovereenkomst met uitzendbeding</strong>
      <div>
        1. De uitzendovereenkomst met uitzendbeding eindigt:
      </div>
      <ul style="padding: 0 0 0 20px; margin: 0;">
        <li style="list-style-type: none;">
          - Van rechtswege doordat de opdrachtgever om welke reden dan ook de
          uitzendkracht niet langer wil of kan inlenen;
        </li>
        <li style="list-style-type: none;">
          - Van rechtswege doordat de uitzendkracht om welke reden dan ook de
          bedongen arbeid niet langer wil of kan verrichten;
        </li>
        <li style="list-style-type: none;">
          - Van rechtswege door arbeidsongeschiktheid van de uitzendkracht.
        </li>
        <li style="list-style-type: none;">
          - Van rechtswege na 78 gewerkte weken, voordat fase B aanvangt.
        </li>
      </ul>
      <br />
      <div>
        2. Wanneer de uitzendkracht de uitzendovereenkomst wil beëindigen dan
        meldt hij dit uiterlijk één werkdag van tevoren bij de
        uitzendonderneming.
      </div>
      <br />

      <strong
        >Artikel. 5 Uitzendbeding en uitsluiting
        loondoorbetalingsverplichting</strong
      >
      <div>
        Op deze uitzendovereenkomst is conform artikel 7:691 BW gedurende
        maximaal 78 weken het uitzendbeding van toepassing. Dit betekent dat de
        uitzendovereenkomst onder andere van rechtswege eindigt, doordat de
        terbeschikkingstelling van de uitzendkracht aan de inlener op verzoek
        van de inlener ten einde komt.
      </div>
      <br />
      <div>
        Er geldt geen uitsluiting van de loondoorbetalingsverplichting. Dit
        betekent dat er loon verschuldigd is tot het einde van de
        uitzendovereenkomst, ook als het werk is weggevallen en er geen
        werkzaamheden zijn verricht.
      </div>
      <br />

      <strong>Artikel 6. Omvang arbeidsduur en werktijden</strong>
      <div>
        De arbeidsduur bedraagt {{ offer.hoursPerWeek }} uur per week. De
        inlener is gerechtigd tot het geven van overwerk en in overleg met de
        uitzendkracht en de uitzendonderneming wijzigingen in de werktijden aan
        te brengen voor zover bedrijfsomstandigheden daartoe noodzaken, met
        inachtneming van de wettelijke bepalingen.
      </div>
      <br />

      <strong>Artikel 7. Functie aard werkzaamheden</strong>
      <div>
        De uitzendkracht zal in de functie van {{ job.title }} bij de
        opdrachtgever de volgende werkzaamheden verrichten: alle voorkomende
        werkzaamheden. De uitzendkracht verklaart tevens dat hij/zij geen
        gegevens van welke aard dan ook te hebben verzwegen die het aanvaarden
        van deze aanstelling in de functie van {{ job.title }}. in de weg zouden
        kunnen staan.
      </div>
      <br />

      <strong>Artikel. 8 Loon, toeslagen, vergoedingen en inhoudingen</strong>
      <ul style="padding: 0 0 0 20px; margin: 0;">
        <li style="list-style-type: decimal;">
          Deze cao/beloningsregeling is van toepassing: {{ offer.CAO }}
        </li>
        <li style="list-style-type: decimal;">
          Het bruto feitelijk (uur)loon bedraagt: € {{ offer.rate }}
        </li>
        <li style="list-style-type: decimal;">
          De van toepassing zijnde toeslagen voor overwerk, onregelmatigheid,
          ploegen, fysieke omstandigheden, feestdagen en/of verschoven uren
          bedragen: n.v.t.
        </li>
        <li style="list-style-type: decimal;">
          De van toepassing zijnde vergoedingen bedragen: €0,19 per kilometer.
        </li>
        <li style="list-style-type: decimal;">
          De van toepassing zijnde inhoudingen waarvoor u middels ondertekening
          toestemming voor geeft bedragen: n.v.t.
        </li>
        <li style="list-style-type: decimal;">
          Indien bekend, de initiële loonsverhoging: conform CAO
        </li>
      </ul>
      <br />
      <div>
        De uitzendkracht kan aan meerdere opdrachtgevers ter beschikking worden
        gesteld. Indien de uitzendkracht aan een andere opdrachtgever ter
        beschikking wordt gesteld, dan kan dit ertoe leiden dat bovenstaande
        arbeidsvoorwaarden worden aangepast. De uitzendonderneming zal de
        aangepaste arbeidsvoorwaarden schriftelijk aan de uitzendkracht
        bevestigen.
      </div>
      <br />
      <div>
        Uitsluitend de uitzendonderneming en nooit de opdrachtgever is loon
        verschuldigd aan de uitzendkracht.
      </div>
      <br />
      <div>
        Middels ondertekening van deze overeenkomst verzoekt de uitzendkracht de
        uitzendonderneming om de loonheffingskorting toe te passen. De
        ingangsdatum voor het toepassen van de loonheffingskorting is gelijk aan
        de startdatum conform deze overeenkomst. Mocht de uitzendkracht hiervan
        willen afwijken moet hij/zij een loonbelastingverklaring formulier
        aanleveren waarop staat dat hij geen loonheffingskorting wil toepassen.
      </div>
      <br />
      <div>
        De werknemer stemt ermee in dat zijn salarisstrook en zijn jaaropgave
        digitaal aan hem worden verstrekt.
      </div>
      <br />
      <strong>Artikel 9. Vakantie</strong>
      <div>
        De uitzendkracht heeft bij elke volledig gewerkte maand recht op 16 2/3
        uur vakantie. De uitzendonderneming reserveert in de ABU-cao genoemde
        percentage van het feitelijk loon van de uitzendkracht verhoogd met de
        wachtdagcompensatie.
      </div>
      <br />
      <strong>Artikel 10. Arbeidsongeschiktheid</strong>
      <ul style="padding: 0 0 0 20px; margin: 0;">
        <li style="list-style-type: none;">
          - Bij ziekte informeert de uitzendkracht onverwijld, maar in ieder
          geval vóór 09.00 uur, de opdrachtgever alsmede de uitzendonderneming;
        </li>
        <li style="list-style-type: none;">
          - De eerste twee dagen van arbeidsongeschiktheid gelden als wachtdag
          op grond van de Ziektewet, waarover de uitzendkracht geen recht op
          uitkering heeft. Voor één van deze twee wachtdagen wordt de
          uitzendkracht gecompenseerd door een opslag op het feitelijk loon.
        </li>
        <li style="list-style-type: none;">
          - De uitzendkracht machtigt de verzekeraar, de arbodienst, het
          reïntegratiebedrijf van de uitzendonderneming en de private of
          publieke uitvoeringsinstelling van werknemersverzekeringen (UWV) van
          de uitzendonderneming om gebruik te maken van administratieve gegevens
          die verband houden met zijn dienstverband voor zover de informatie
          noodzakelijk is voor een adequate verzuimbegeleiding en een correcte
          loondoorbetaling bij ziekte.
        </li>
        <li style="list-style-type: none;">
          - De uitzendkracht machtigt de uitzendonderneming om – zodra de
          uitzendovereenkomst twee maanden heeft geduurd - bij de
          uitvoeringsinstelling voor werknemersverzekeringen (UWV) informatie
          over het uitkeringsverleden e.d. op te vragen voor zover de informatie
          kan leiden tot een loonkosten-verlaging voor de uitzendonderneming.
        </li>
      </ul>
      <br />
      <strong>Artikel 11. Risico-inventarisatie</strong>
      <div>
        De uitzendkracht zal in het belang van orde, veiligheid en gezondheid de
        gegeven voorschriften en aanwijzingen, zoals deze voor het personeel van
        de opdrachtgever van toepassing zijn, in acht nemen. De
        uitzendonderneming informeert de uitzendkracht voor aanvang van zijn
        werkzaamheden over de vereiste (beroeps) kwalificaties en mogelijk
        aanwezige veiligheids- en gezondheidsrisico’s, en hoe daarmee om te
        gaan. In het kader van de arbeidsomstandighedenwet is de uitzendkracht
        verplicht kennis te nemen van de mogelijke gevaren die het werken bij de
        opdrachtgever met zich meebrengt. Tevens is de uitzendkracht verplicht
        alle voorgeschreven beschermende middelen te gebruiken die ter
        beschikking zijn gesteld voor het werken in onveilige situaties.
      </div>
      <br />
      <strong>Artikel 12. Pensioen</strong>
      <div>
        De uitzendkracht heeft recht op de opbouw van pensioen zodra hij voldoet
        aan de voorwaarden van toetreding van het bedrijfspensioenfonds STIPP,
        zoals te vinden op www.stippensioen.nl, of wanneer de uitzendkracht
        voldoet aan de voorwaarden van toetreding van enig ander
        bedrijfstakpensioenfonds.
      </div>
      <br />
      <strong>Artikel 13. Arbeidsverleden</strong>
      <div>
        Bij deze verklaart de uitzendkracht de juiste informatie omtrent zijn
        arbeidsverleden te hebben verstrekt. Onder gevraagde informatie wordt
        mede begrepen informatie over deelname aan de pensioenregeling bij
        vorige werkgever(s). Als uit de informatie is gebleken dat de
        uitzendonderneming als opvolgend werkgever kan worden beschouwd, geeft
        de kandidaat op verzoek inlichtingen over de eventueel aan hem
        uitbetaalde transitievergoeding en mag de uitzendonderneming vóór de
        aanvang van de uitzendarbeid het aanbod nog intrekken. Er is geen sprake
        van opvolgend werkgeverschap wanneer de toepasselijkheid daarvan niet is
        voorzien als gevolg van het door de uitzendkracht bewust of anders
        verwijtbaar verstrekken van onjuiste of onvolledige informatie over zijn
        arbeidsverleden.
      </div>
      <br />
      <strong>Artikel 14. Uitzendkracht is bekend en akkoord</strong>
      <div>
        Zie addendum.
      </div>
      <br />
      <strong>Artikel 15. Verplichtingen uitzendkracht</strong>
      <div>
        De uitzendkracht is jegens de uitzendonderneming verplicht:
      </div>
      <ul style="padding: 0 0 0 20px; margin: 0;">
        <li style="list-style-type: none;">
          - om voorafgaande aan het ondertekenen van de uitzendovereenkomst de
          uitzendonderneming schriftelijk te informeren indien de uitzendkracht
          door de opdrachtgever naar de uitzendonderneming is doorverwezen;
        </li>
        <li style="list-style-type: none;">
          - zich te houden aan redelijke voorschriften van zowel de
          uitzendonderneming als de opdrachtgever omtrent het verrichten van de
          arbeid;
        </li>
        <li style="list-style-type: none;">
          - wijzigingen in zijn persoonlijke gegevens, wijzigingen in zijn
          functie, zijn opleiding en/of overige gegevens die voor de
          arbeidsverhouding van belang zijn direct te melden aan de
          uitzendonderneming;
        </li>
        <li style="list-style-type: none;">
          - geheimhouding te bewaren omtrent al hetgeen de uitzendkracht bij de
          uitoefening van zijn/haar functie bekend wordt en waarvan de
          uitzendkracht redelijkerwijze kan vermoeden, dat bekendmaking daarvan
          de uitzendonderneming of de opdrachtgever schade kan toebrengen;
        </li>
        <li style="list-style-type: none;">
          - bij het verrichten van de werkzaamheden daarvoor bestemd
          werkmateriaal en/of werkkleding te gebruiken, als dit in de
          bedrijfstak van de opdrachtgever gebruikelijk is en/of de wens daarvan
          kenbaar wordt gemaakt;
        </li>
        <li style="list-style-type: none;">
          - zijn werkzaamheden te verrichten onder leiding en toezicht van de
          opdrachtgever;
        </li>
        <li style="list-style-type: none;">
          - de uitzendonderneming direct schriftelijk op de hoogte te stellen
          als de uitzendkracht een arbeidsovereenkomst of arbeidsverhouding met
          de opdrachtgever aan gaat om gedurende de arbeidstijd;
        </li>
        <li style="list-style-type: none;">
          - een geldig legitimatiebewijs bij zich te dragen en deze desgevraagd
          aan bevoegde personen ter inzage te verstrekken.
        </li>
      </ul>
      <br />
      <strong>Artikel 16. Overige bepalingen</strong>
      <div>
        Op deze overeenkomst is Nederlands recht van toepassing.
      </div>
      <br />
      <div>
        De uitzendonderneming is gemachtigd deze overeenkomst eenzijdig te
        wijzigen indien de uitzendonderneming zwaarwegende belangen heeft dit te
        doen en het belang van de uitzendkracht daarvoor, in redelijkheid en
        billijkheid, moet wijken.
      </div>
      <br />
      <strong
        >Ondergetekenden verklaren met het bovenstaande akkoord te gaan.</strong
      >
      <br />
      <div class="row">
        <div class="col-6">Datum : {{ new Date() }}</div>
        <div class="col-6">
          Datum : WORKERDATETIMESTAMP
        </div>
      </div>
      <div class="row">
        <div class="col-6">Plaats : {{ manager.city }}</div>
        <div class="col-6">Plaats : {{ worker.city }}</div>
      </div>
      <div class="row">
        <div class="col-6">
          {{ company.name }}
        </div>
        <div class="col-6">
          Uitzendkracht:
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          voor deze:
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          MANAGERTITLE {{ manager.firstName }} {{ manager.lastName }}
        </div>
        <div class="col-6">
          WORKERTITLE {{ worker.firstName }} {{ worker.lastName }}
        </div>
      </div>
      <br />
      <div class="text-center">
        <strong>Privacyverklaring</strong>
      </div>
      <br />
      <div>
        {{ company.name }} hecht grote waarde aan zorgvuldige en veilige omgang
        met privacygevoelige informatie van haar websitebezoekers, kandidaten,
        werknemers en zelfstandigen. {{ company.name }} heeft daarom deze
        privacyverklaring opgesteld. {{ company.name }} behandelt en beveiligt
        de aan haar toevertrouwde persoonlijke informatie uiterst zorgvuldig.
        Met deze privacyverklaring geeft {{ company.name }} u inzicht hoe
        {{ company.name }} in voorkomende situaties conform de Algemene
        Verordening Gegevensbescherming (AVG) met uw persoonsgegevens omgaat.
      </div>
      <br />
      <div>
        {{ company.name }} doet er alles aan om uw persoonsgegevens optimaal te
        beveiligen tegen onrechtmatig gebruik. Wij doen dit aan de hand van
        fysieke, administratieve, organisatorische en technische maatregelen.
        Bijvoorbeeld: alleen geautoriseerden hebben toegang tot de gegevens.
        Indien en voor zover gegevens worden verstrekt aan gegevenbewerkers die
        namens haar diensten verlenen of opdrachten uitvoeren, is
        {{ company.name }} met hen overeengekomen dat zij de persoonsgegevens
        eveneens optimaal beveiligen.
      </div>
      <br />
      <div>
        <strong>Waarom verzamelen wij uw persoonsgegevens?</strong>
      </div>
      <div>
        Uw persoonsgegevens worden gebruikt om de aan u aangeboden hr-diensten
        zo goed mogelijk te kunnen verlenen, waaronder uitzenden, detachering,
        bemiddeling, payroll, salarisadministratie, personeelsmanagement,
        persoonlijke ontwikkeling & inzetbaarheid en werving & selectie.
        {{ company.name }} gebruikt uw gegevens voor onder andere onderstaande
        doeleinden: Gewerkte uren te registreren en te verwerken in ons
        salarissysteem. Een werknemers- of personeels-/bemiddelingsrelatie met u
        aan te gaan en te onderhouden en hiervoor de relevante administratie uit
        te voeren. Onze re-integratieverplichtingen na te komen en te voldoen
        aan (het vanuit de overheid opgelegde doeleinde) om personen met een
        grote(re) afstand tot de arbeidsmarkt aan het werk te helpen. Een
        opdracht bij de opdrachtgever te kunnen vastleggen in een overeenkomst
        met de opdrachtgever en de overeenkomst met de opdrachtgever te
        onderhouden en na te komen. Voor naleving van wet- en regelgeving,
        waaronder maar niet beperkt tot identificatie, abeidswetgeving, fiscale-
        en sociale zekerheidswetgeving, bestrijding van fraude en nationale en
        internationale sanctiewetgeving.
      </div>
      <br />
      <div>
        <strong>Welke persoonsgegevens verzamelen wij?</strong>
      </div>
      <div>
        Indien u voor {{ company.name }} of haar opdrachtgevers gaat
        werken/werkt/heeft gewerkt als werknemer of gedetacheerde, als u
        ingeschreven staat als werkzoekende, of als u werknemers van
        {{ company.name }} inleent, kan {{ company.name }} onder andere de
        onderstaande persoonlijke gegevens verwerken. U bent zelf
        verantwoordelijk dat de door u aangedragen persoonlijke gegevens juist
        en up to date zijn. NAW gegevens, e-mailadres, telefoonnummer, bank-
        en/of girorekeningnummer en andere contactgegevens Geboortegegevens,
        leeftijd, geslacht, Nationaliteit, BSN & identiteitsbewijs (kopie
        identiteitsbewijs), een eventuele werkvergunning. Gegevens betreffende
        de aard en inhoud van de vorige arbeidsbemiddelingen, alsmede
        betreffende de beëindiging ervan. Overige gegevens die gerelateerd zijn
        aan de personeels-, salaris- en verzuimregistratie Andere dan de
        hierboven genoemde gegevens waarvan de verwerking wordt vereist
        ingevolge of noodzakelijk is met het oog op de toepassing van de wet
      </div>
      <br />
      <div>
        <strong>Wat zijn uw rechten?</strong>
      </div>
      <div>Inzage in of wijzigen van uw gegevens</div>
      <div>Verwerking van uw gegevens beperken</div>
      <div>Recht om gegevens over te dragen</div>
      <div>Recht om vergeten te worden</div>
      <br />
      <div>
        Middels ondertekening van deze overeenkomst geeft u
        {{ company.name }} toestemming om correspondentie met betrekking tot uw
        dienstverband bij {{ company.name }} waaronder verzending van uw
        loonstrook en jaaropgave, per e-mail te verzenden naar het e-mailadres
        zoals vermeld op pagina 1 van deze overeenkomst.
      </div>
      <div>
        Middels ondertekening van deze overeenkomst verklaart u op de hoogte te
        zijn van onze privacyverklaring.
      </div>
      <div>{{ company.city }}, {{ dateFormatter(new Date(offer.startDate)) }}</div>
      <div>
        Voor akkoord,
      </div>
      <br />
      <br />
      <br />
      «(FW:formele_tenaamstelling)»
    </div>
  </b-modal>
</template>

<script>
import dateFormatter from '@/helpers/DateFormatter.js';

export default {
  name: "ViewJobOffer",
  props: {
    open: {
      default: function() {
        return false;
      }
    },
    offer: {
      default: function() {
        return {};
      }
    },
    company: {
      default: function() {
        return {};
      }
    },
    manager: {
      default: function() {
        return {};
      }
    },
    worker: {
      default: function() {
        return {};
      }
    },
    job: {
      default: function() {
        return {};
      }
    }
  },
  methods: {
    dateFormatter
  },
  watch: {
    open(value, old) {
      if (value && !old) {
        this.$refs["modal-view-offer"].show();
      }
      if (!value && old) {
        this.$refs["modal-view-offer"].show();
      }
    }
  }
};
</script>

<style scoped></style>
