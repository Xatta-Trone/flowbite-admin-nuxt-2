import Vue from 'vue'
import { ServerTable, ClientTable } from 'vue-tables-2-premium'

var myTheme = function () {
  return {
    framework: 'tailwind',
    table:
      'min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600',
    tbody:
      'bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700',
    th: 'bg-gray-100 dark:bg-gray-700 px-4 py-4 border-r-black ',
    td: 'px-4 py-2 divide-x',
    tr: 'px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700',
    trEven: '',
    trOdd: '',
    row: 'grid-rows-1',
    column: 'flex justify-between',
    label: 'label',
    input:
      'ml-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
    select:
      'ml-2 bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500',
    field: 'flex-initial m-2',
    inline: 'is-horizontal',
    right: 'is-pulled-right',
    left: 'is-pulled-left',
    center: 'text-center',
    contentCenter: 'is-centered',
    icon: 'icon',
    small: 'is-small',
    nomargin: 'marginless',
    button: 'button',
    groupTr: 'is-selected',
    dropdown: {
      container: 'dropdown flex-initial m-2 relative',
      trigger: 'dropdown-trigger border round p-1',
      menu: 'dropdown-menu absolute z-50 bg-white border p-2',
      content: 'dropdown-content truncate flex-1',
      item: 'dropdown-item mb-1 flex',
      caret: 'fa fa-angle-down',
      checkbox: 'mt-1',
      text: 'text-left ml-1',
    },
    pagination: {
      nav: 'mt-1 text-center',
      count: 'text-center',
      wrapper: 'pagination',
      list: 'flex',
      item: 'm-1 border rounded-md',
      link: 'block w-max px-3 py-2',
      next: '',
      prev: '',
      active: 'bg-primary-600 text-white rounded-md',
      disabled: 'text-gray-400',
    },
  }
}
window.axios = require('axios')

Vue.use(ClientTable, {}, false, myTheme)
Vue.use(
  ServerTable,
  {
    perPage: 25,
    perPageValues: [5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    pagination: { chunk: 5 },
    orderBy: { ascending: false },
    skin: 'table-hover',
    stickyHeader: true,
    dateColumns: ['created_at', 'updated_at'],
    requestKeys: {
      query: 'query',
      limit: 'per_page',
      orderBy: 'order_by',
      ascending: 'order',
      page: 'page',
      byColumn: 'byColumn',
    },
    responseAdapter: function (resp) {
      var data = this.getResponseData(resp)
      return { data: data.data, count: data.meta.count }
    },
    requestFunction(data) {
      return (
        this.$axios
          .get(this.url, {
            params: data,
          })
          // .then(data => {
          //   console.log(data)
          // })
          .catch(function (e) {
            this.dispatch('error', e)
          })
      )
    },
  },
  false,
  myTheme
)
