<template>
    <div id="page_profile" class="dashboard-content">
        <div class="container-fluid">
            <a href="javascript;" class="back" @click.prevent="$router.go(-1)">
                <i class="icon-angle-left ml-2"/> Back
            </a>
            <b-row class="mt-5">
                <b-col md="12">
                    <div class="profile-header">
                        <div class="profile-header__photo">
                            <img src="@/assets/image/avatar_nick.png"/>
                        </div>
                        <div class="profile-header__description">
                            <h2 class="fullName">Magalie Lindeboom</h2>
                            <h3 class="position">Visual Designer</h3>
                        </div>
                    </div>
                    <div class="profile-edit">
                        <a href="javascript:void(0);" @click.prevent="">Edit profile
                            <i class="icon-pencil ml-2"/>
                        </a>
                    </div>
                </b-col>
            </b-row>

            <b-row class="mt-1">
                <b-col md="6">
                    <b-card class="mt-4">
                        <template v-slot:header>
                            <h5 class="m-0">Bodytekst</h5>
                        </template>
                        <div>
                            Hanc ego assentior, cum teneam sententiam, quid et iusto odio dignissimos ducimus, qui. Quae
                            fuerit causa, nollem me ab eo est consecutus? laudem et dolore suo. Sed ut summum bonum esse
                            albam, dulce mel quorum facta quem modo ista. Filium morte multavit si sine dubio praeclara
                            sunt, explicabo nemo enim ipsam per. Meer +
                        </div>
                    </b-card>
                    <b-row>
                        <b-col md="6">
                            <b-card class="mt-4">
                                <img src="@/assets/image/icon/mail-red.svg" style="width: 31px"/>
                                <span class="ml-3">magalie_l@hotmail.com</span>
                            </b-card>
                        </b-col>
                        <b-col md="6" class="mt-4">
                            <b-card>
                                <img src="@/assets/image/icon/phone-red.svg" style="width: 22px"/>
                                <span class="ml-3">+ 31 6 53 72 41 31</span>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col md="6">
                    <b-card class="mt-4">
                        <template v-slot:header>
                            <h5 class="m-0">Specificaties</h5>
                        </template>
                        <div>
                            <ul class="custom-list">
                                <li>Ingeschreven sinds <span class="pull-right">08-09-2019</span></li>
                                <li>Leeftijd <span class="pull-right">29 jaar</span></li>
                                <li>Status <span class="pull-right">Beschikbaar</span></li>
                                <li>Locatie <span class="pull-right">Arnhem</span></li>
                            </ul>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
            <b-row class="mt-5">
                <b-col md="12">
                    <b-card>
                        <template v-slot:header>
                            <div class="d-flex">
                                <h5 class="m-0 flex-1">Bestanden</h5>
                                <div>
                                    <div class="float-right">
                                        <button class="btn btn-blue upload" style="width: 100px">
                                            Upload
                                            <i class="icon-upload ml-2"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div>
                            <ul class="custom-list">
                                <li class="d-flex">
                                    <div class="flex-3">
                                        CV-magalie-2019.pdf
                                    </div>
                                    <div class="flex-2">
                                        Geupload op 23 juli 2019 om 15:09
                                    </div>
                                    <div class="flex-1">
                                        2,3mb
                                    </div>
                                    <div>
                                        <i class="icon-more-vertical mr-2"/>
                                        <i class="icon-bin"/>
                                    </div>
                                </li>
                                <li class="d-flex">
                                    <div class="flex-3">
                                        Motivatie.docx
                                    </div>
                                    <div class="flex-2">
                                        Geupload op 23 juli 2019 om 15:09
                                    </div>
                                    <div class="flex-1">
                                        2,3mb
                                    </div>
                                    <div>
                                        <i class="icon-more-vertical mr-2"/>
                                        <i class="icon-bin"/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile"
    }
</script>

<style scoped>

</style>