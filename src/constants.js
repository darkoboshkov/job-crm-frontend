import i18n from "./plugins/i18n";

const pagination = {
  paginationOptions: {
    enabled: true,
    perPage: 20
  },
  serverParams: {
    page: 1,
    limit: 20,
    sort: "",
    order: ""
  }
};

export const APP_URL = process.env.VUE_APP_URL;

export const EXPENSE_STATE = {
  NOT_SUBMITTED: "not-submitted",
  SUBMITTED: "submitted",
  DECLINED: "declined",
  APPROVED: "approved"
};

export const TIME_SHEET_STATE = {
  NOT_SUBMITTED: "not-submitted",
  SUBMITTED: "submitted",
  DECLINED: "declined",
  APPROVED: "approved"
};

export const candidatesTable = {
  pagination,
  columns: [
    {
      label: i18n.t("page_candidates.table.name"),
      field: "name",
      name: "name",
      tdClass: "link"
    },
    {
      label: i18n.t("page_candidates.table.profession"),
      field: "profession",
      name: "profession"
    },
    {
      label: i18n.t("page_candidates.table.location"),
      field: "city",
      name: "city"
    },
    {
      label: i18n.t("page_candidates.table.company"),
      field: "company.name",
      name: "company"
    },
    {
      label: i18n.t("page_candidates.table.active_contract"),
      field: "activeContract",
      name: "activeContract"
    },
    {
      label: i18n.t("page_candidates.table.status"),
      field: "status",
      name: "status"
    },
    {
      label: i18n.t("page_candidates.table.actions"),
      field: "actions",
      name: "actions"
    }
  ],
  filterOptions: [
    {
      title: i18n.t("page_candidates.filter.name"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_candidates.filter.profession"),
      type: "select",
      options: [],
      value: "123"
    },
    {
      title: i18n.t("page_candidates.filter.city"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_candidates.filter.active_contract"),
      type: "radio",
      value: "",
      options: [
        {
          label: i18n.t("page_candidates.filter.yes"),
          value: "yes"
        },
        {
          label: i18n.t("page_candidates.filter.no"),
          value: "no"
        }
      ]
    },
    {
      title: i18n.t("page_candidates.filter.status"),
      type: "radio",
      value: "",
      options: [
        {
          label: i18n.t("page_candidates.filter.available"),
          value: "available"
        },
        {
          label: i18n.t("page_candidates.filter.unavailable"),
          value: "unavailable"
        }
      ]
    }
  ]
};

export const companiesTable = {
  pagination,
  columns: [
    {
      label: i18n.t("page_companies.table.name"),
      field: "name",
      name: "name"
    },
    {
      label: i18n.t("page_companies.table.email"),
      field: "email",
      name: "email"
    },
    {
      label: i18n.t("page_companies.table.kvk"),
      field: "kvkNumber",
      name: "kvk"
    },
    {
      label: i18n.t("page_companies.table.since"),
      field: "createdAt",
      name: "createdAt"
    },
    {
      label: i18n.t("page_companies.table.status"),
      field: "activeState",
      name: "activeState"
    },
    {
      label: i18n.t("page_companies.table.actions"),
      field: "actions",
      name: "actions"
    }
  ],
  filterOptions: [
    {
      title: i18n.t("page_companies.filter.name"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_companies.filter.email"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_companies.filter.status"),
      type: "checkbox",
      value: "",
      options: [
        {
          label: i18n.t("page_companies.filter.active"),
          checked: false
        },
        {
          label: i18n.t("page_companies.filter.inactive"),
          checked: false
        }
      ]
    },
    {
      title: i18n.t("page_companies.filter.city"),
      type: "text",
      value: ""
    }
  ]
};

export const jobsTable = {
  pagination,
  columns: [
    {
      label: i18n.t("page_jobs.table.title"),
      field: "title",
      name: "title"
    },
    {
      label: i18n.t("page_jobs.table.location"),
      field: "location",
      name: "location"
    },
    {
      label: i18n.t("page_jobs.table.company"),
      field: "company.name",
      name: "company"
    },
    {
      label: i18n.t("page_jobs.table.manager"),
      field: "manager",
      name: "manager"
    },
    {
      label: i18n.t("page_jobs.table.wage"),
      field: "wage",
      name: "wage"
    },
    {
      label: i18n.t("page_jobs.table.rate"),
      field: "payRate",
      name: "payRate"
    },
    {
      label: i18n.t("page_jobs.table.start_date"),
      field: "startDate",
      name: "startDate"
    },
    {
      label: i18n.t("page_jobs.table.end_date"),
      field: "endDate",
      name: "endDate"
    },
    {
      label: i18n.t("page_jobs.table.status"),
      field: "status",
      name: "status"
    },
    {
      label: i18n.t("page_jobs.table.actions"),
      field: "actions",
      name: "actions"
    }
  ],
  filterOptions: [
    {
      title: i18n.t("page_jobs.filter.title"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_jobs.filter.city"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_jobs.filter.start_date"),
      type: "group",
      items: [
        {
          title: "",
          type: "date",
          value: ""
        },
        {
          title: "",
          type: "date",
          value: ""
        }
      ]
    },
    {
      title: i18n.t("page_jobs.filter.wage"),
      type: "group",
      items: [
        {
          title: "",
          type: "number",
          value: ""
        },
        {
          title: "",
          type: "number",
          value: ""
        }
      ]
    },
    {
      title: i18n.t("page_jobs.filter.rate"),
      type: "group",
      items: [
        {
          title: "",
          type: "number",
          value: ""
        },
        {
          title: "",
          type: "number",
          value: ""
        }
      ]
    },
    {
      title: i18n.t("page_jobs.filter.manager"),
      type: "select",
      options: [2, 3],
      value: ""
    },
    {
      title: i18n.t("page_jobs.filter.status"),
      type: "radio",
      value: "",
      options: [
        {
          label: i18n.t("page_jobs.filter.open"),
          value: "open"
        },
        {
          label: i18n.t("page_jobs.filter.closed"),
          value: "closed"
        }
      ]
    }
  ]
};

export const offersTable = {
  pagination,
  columns: [
    {
      label: i18n.t("page_offers.table.image"),
      field: "image",
      name: "image"
    },
    {
      label: i18n.t("page_offers.table.worker"),
      field: "worker",
      name: "worker"
    },
    {
      label: i18n.t("page_offers.table.job"),
      field: "job",
      name: "job"
    },
    {
      label: i18n.t("page_offers.table.hiring_company"),
      field: "hiringCompany.name",
      name: "hiringCompany"
    },
    {
      label: i18n.t("page_offers.table.start_date"),
      field: "startDate",
      name: "startDate"
    },
    {
      label: i18n.t("page_offers.table.end_date"),
      field: "endDate",
      name: "endDate"
    },
    {
      label: i18n.t("page_offers.table.status"),
      field: "status",
      name: "status"
    },
    {
      label: i18n.t("page_offers.table.actions"),
      field: "actions",
      name: "actions"
    }
  ],
  filterOptions: [
    {
      title: i18n.t("page_offers.filter.title"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_offers.filter.worker_name"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_offers.filter.hiring_company"),
      type: "select",
      options: [2, 3],
      value: ""
    },
    {
      title: i18n.t("page_offers.filter.type"),
      type: "radio",
      value: "",
      options: [
        {
          label: i18n.t("page_offers.filter.worker_contract"),
          value: "worker_contract"
        },
        {
          label: i18n.t("page_offers.filter.company_contract"),
          value: "company_contract"
        }
      ]
    },
    {
      title: i18n.t("page_offers.filter.start_date"),
      type: "group",
      items: [
        {
          title: "",
          type: "date",
          value: ""
        },
        {
          title: "",
          type: "date",
          value: ""
        }
      ]
    },
    {
      title: i18n.t("page_offers.filter.end_date"),
      type: "group",
      items: [
        {
          title: "",
          type: "date",
          value: ""
        },
        {
          title: "",
          type: "date",
          value: ""
        }
      ]
    },
    {
      title: i18n.t("page_offers.filter.status"),
      type: "select",
      options: [2, 3],
      value: ""
    }
  ]
};

export const timesheetsTable = {
  pagination,
  columns: [
    {
      label: i18n.t("page_timesheets.table.week"),
      field: "week",
      name: "week"
    },
    {
      label: i18n.t("page_timesheets.table.worker"),
      field: "worker",
      name: "worker"
    },
    {
      label: i18n.t("page_timesheets.table.hand_in_date"),
      field: "submitDate",
      name: "hand_in_date"
    },
    {
      label: i18n.t("page_timesheets.table.hours"),
      field: "hours",
      name: "hours"
    },
    {
      label: i18n.t("page_timesheets.table.price"),
      field: "price",
      name: "price"
    },
    {
      label: i18n.t("page_timesheets.table.hiring_manager"),
      field: "hiringManager",
      name: "hiring_manager"
    },
    {
      label: i18n.t("page_timesheets.table.hiring_company"),
      field: "hiringCompany",
      name: "hiring_company"
    },
    {
      label: i18n.t("page_timesheets.table.status"),
      field: "status",
      name: "status"
    },
    {
      label: i18n.t("page_timesheets.table.actions"),
      field: "actions",
      name: "actions"
    }
  ],
  filterOptions: [
    {
      title: i18n.t("page_timesheets.filter.kind"),
      type: "radio",
      value: "",
      options: [
        {
          label: i18n.t("page_timesheets.filter.timesheets"),
          value: "open"
        },
        {
          label: i18n.t("page_timesheets.filter.expenses"),
          value: "closed"
        }
      ]
    },
    {
      title: i18n.t("page_timesheets.filter.week"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_timesheets.filter.year"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_timesheets.filter.worker"),
      type: "text",
      value: ""
    },
    {
      title: i18n.t("page_timesheets.filter.hiring_manager"),
      type: "select",
      options: [2, 3],
      value: ""
    },
    {
      title: i18n.t("page_timesheets.filter.hiring_company"),
      type: "select",
      options: [2, 3],
      value: ""
    },
    {
      title: i18n.t("page_timesheets.filter.status"),
      type: "select",
      options: [2, 3],
      value: ""
    }
  ]
};
