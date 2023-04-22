<template>
  <div class="">
    <!-- <v-client-table :data="tableData" :columns="columns" /> -->
    <v-server-table
      url="https://server.pl-tutorials.com/api/v1/books"
      :columns="columns"
      :options="options"
    />


  </div>
</template>
<script>
import Vuetable from 'vuetable-2'
export default {
  components: {
    Vuetable,
  },
  data() {
    return {
      columns: ['id', 'name', 'author'],
      tableData: [
        { id: 1, name: 'John', author: '20' },
        { id: 2, name: 'Jane', author: '24' },
        { id: 3, name: 'Susan', author: '16' },
        { id: 4, name: 'Chris', author: '55' },
        { id: 5, name: 'Dan', author: '40' },
      ],
      options: {
        // perPage: 10,
        // perPageValues: [5, 10, 15, 25, 50, 100],
        // pagination: { chunk: 5 },
        // orderBy: { ascending: false },
        headings: {
          id: '#',
        },
        // requestFunction(data) {
        //   return this.$axios
        //     .get(this.url, {
        //       params: data,
        //     })
        //     // .then(data => {
        //     //   console.log(data)
        //     // })
        //     .catch(function (e) {
        //       this.dispatch('error', e)
        //     })
        // },
      },
      table: {
        tableWrapper: '',
        tableHeaderClass: 'mb-0',
        tableBodyClass: 'mb-0',
        tableClass: 'table table-bordered table-hover',
        loadingClass: 'loading',
        ascendingIcon: 'fa fa-chevron-up',
        descendingIcon: 'fa fa-chevron-down',
        ascendingClass: 'sorted-asc',
        descendingClass: 'sorted-desc',
        sortableIcon: 'fa fa-sort',
        detailRowClass: 'vuetable-detail-row',
        handleIcon: 'fa fa-bars text-secondary',
        renderIcon(classes, options) {
          return `<i class="${classes.join(' ')}"></span>`
        },
      },
    }
  },
}
</script>
