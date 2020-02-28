<template>
	<div id="offers" class="dashboard-content">
		<h1 class="title">
			{{ $t("page_offers.title") }}
		</h1>
		<p class="sub-title">
			{{ $t("page_offers.sub_title", { offers: this.totalRows }) }}
		</p>
		<div class="jobs-list mt-5">
			<vue-good-table
					mode="remote"
					@on-page-change="onPageChange"
					@on-per-page-change="onPerPageChange"
					:totalRows="totalRows"
					:rows="rows"
					:columns="columns"
					:pagination-options="paginationOptions"
					:search-options="{ enabled: false }"
					styleClass="custom-table"
			>
			</vue-good-table>
		</div>
	</div>
</template>

<script>
    import offersApi from "@/services/api/joboffers";
    import { APP_URL } from "@/constants";

    export default {
        name: "OfferList",
        data() {
            return {
                APP_URL,
                isLoading: true,
                paginationOptions: {
                    enabled: true,
                    perPage: 5
                },
                columns: [],
                rows: [],
                searchTerm: "",
                matched: false,
                totalRows: 0,
                serverParams: {
                    columnFilters: {},
                    page: 1,
                    limit: 5,
                    sort: "",
                    order: ""
                }
            };
        },
        computed: {
            role() {
                return this.$store.state.user.role;
            },
            companyId() {
                return this.$store.state.user.companyId;
            }
        },
        mounted() {
            this.getActiveOffers();
        },
        methods: {
            onPerPageChange(e) {
                this.serverParams = Object.assign({}, this.serverParams, {
                    limit: e.currentPerPage
                });
                this.getActiveOffers();
            },
            onPageChange(e) {
                this.serverParams = Object.assign({}, this.serverParams, {
                    page: e.currentPage
                });
                this.getActiveOffers();
            },
            goToOffer(props) {
                if (props && props.row) {
                    this.$router.push(`/${this.role}/dashboard/joboffers/${props.row._id}`);
                }
            },
            getActiveOffers() {}
        }
    };
</script>
