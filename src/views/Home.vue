<template>
  <div>
    <b-row>
      <b-button variant="outline-primary" size="sm" class="mr-2 ml-5" v-b-modal.dataForm>Add/Update</b-button>
      <data-form @clicked="selectListItem" :dataForm="dataForm"></data-form>
      <b-button variant="outline-primary" size="sm" @click="refreshTable()">Refresh</b-button>
    </b-row>
    <b-row style="place-content: center;" class="mt-5">
      <b-card class="mr-2">
        <div>
          <!-- search input -->
          <div class="custom-search d-flex justify-content-end">
            <b-form-group>
              <div class="d-flex align-items-center">
                <b-form-input
                  v-model="searchTerm"
                  placeholder="Search"
                  type="text"
                  class="d-inline-block"
                />
              </div>
            </b-form-group>
          </div>
      
          <!-- table -->
          <vue-good-table
            ref="chartTable"
            :columns="columns"
            :rows="rows"
            :search-options="{
            enabled: true,
            externalQuery: searchTerm }"
            :select-options="{
            enabled: false,
            selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true, // disable the select info panel on top
            selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
          }"
            :pagination-options="{
            enabled: true,
            perPage:pageLength
          }"
            theme="my-theme"
            @on-row-click="onRowClick"
          >
          <div slot="emptystate">
            No data for a table
          </div>
            <!-- Column: Table Column -->
            <template
                slot="table-row"
                slot-scope="props"
            >
            <!-- Column: Symbol Name -->
              <span
                  v-if="props.column.field === 'symbol'"
                  class="text-nowrap"
              >
                <span>{{ props.row.symbol }}</span>
              </span>
              <!-- Column: Last Price -->
              <span
                  v-else-if="props.column.field === 'lastPrice'"
                  class="text-nowrap"
              >
                <span>{{ props.row.lastPrice }}</span>
              </span>
              <!-- Column: Weighted Avarage Price -->
              <span
                  v-else-if="props.column.field === 'weightedAvgPrice'"
                  class="text-nowrap"
              >
                <span>{{ props.row.weightedAvgPrice }}</span>
              </span>
            </template>
      
            <!-- pagination -->
            <template
              slot="pagination-bottom"
              slot-scope="props"
            >
              <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-center mb-0 mt-1">
                  <span class="text-nowrap ">
                    Showing 1 to
                  </span>
                  <b-form-select
                    v-model="pageLength"
                    :options="['3','5','10']"
                    class="mx-1"
                    @input="(value)=>props.perPageChanged({currentPerPage:value})"
                  />
                  <span class="text-nowrap"> of {{ props.total }} entries </span>
                </div>
                <div>
                  <b-pagination
                    :value="1"
                    :total-rows="props.total"
                    :per-page="pageLength"
                    first-number
                    last-number
                    align="right"
                    prev-class="prev-item"
                    next-class="next-item"
                    class="mt-1 mb-0"
                    @input="(value)=>props.pageChanged({currentPage:value})"
                  >
                    <template #prev-text>
                      <feather-icon
                        icon="ChevronLeftIcon"
                        size="18"
                      />
                    </template>
                    <template #next-text>
                      <feather-icon
                        icon="ChevronRightIcon"
                        size="18"
                      />
                    </template>
                  </b-pagination>
                </div>
              </div>
            </template>
          </vue-good-table>
        </div>
      </b-card>
      <b-card>
        <apexchart
          type="pie"
          width="550"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </b-card>
    </b-row>
  </div>
</template>

<script>
export default {

  data() {
    return {
      pageLength: 5,
      dir: false,
      seriesData: null,
      avgPriceToString: null,
      onlyPrice: null,
      dataForm: {},
      columns: [
        {
          label: 'Symbol Name',
          field: `symbol`,
        },
        {
          label: 'Last Price',
          field: `lastPrice`,
        },
        {
          label: 'Weighted Avarage Price',
          field: `weightedAvgPrice`,
        }
      ],
      rows: [],
      searchTerm: '',
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "%"
                },
              },
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  methods:{
    onRowClick(params) {
    },
    refreshTable(){
      window.location.reload()
    },
    selectListItem (value) {
      this.rows.push(value)
      this.chartOptions.labels.push(value.symbol)
      console.log('labels', this.labels)
      var integer = Math.floor(value.weightedAvgPrice).toString();
      this.avgPriceToString = value.weightedAvgPrice.toString();
      if (integer.length === this.avgPriceToString.length)
        return "0";
      this.onlyPrice = this.avgPriceToString.substring(integer.length + 5)
      this.seriesData = Math.floor(this.onlyPrice % 100)
      this.series.push(this.seriesData) 
    }
  }
}
</script>

