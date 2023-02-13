<template>
  <div style="margin-top: 16px">
    <el-table :stripe="true" :data="tableData" border style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }" @sort-change="sortChange">
      <el-table-column type="index" :index="indexMethod" label="序号" width="60"></el-table-column>
      <el-table-column v-if="my" prop="name" label="资源名称">
        <template slot-scope="scope">
          <span class="bz" :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column v-else prop="applyUserName" label="资源名称">
        <template slot-scope="scope">
          <span class="bz" :title="scope.row.applyUserName">{{ scope.row.applyUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="my" prop="deptName" label="申请部门">
        <template slot-scope="scope">
          <span class="bz" :title="scope.row.deptName">{{ scope.row.deptName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-else prop="applyDeptName" label="申请部门"><template slot-scope="scope">
          <span class="bz" :title="scope.row.applyDeptName">{{ scope.row.applyDeptName }}</span>
        </template></el-table-column>
      <el-table-column prop="applyTime" label="申请时间" sortable="custom">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.applyTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="reviewedStatus" label="申请状态" sortable="custom">
        <!-- <template slot-scope="scope">
          <samp v-if="scope.row.reviewedStatus == 0" style="color: red"
            >未审核</samp
          >
          <samp v-else-if="scope.row.reviewedStatus == 2">{{
            my ? "已受理" : "已审核"
          }}</samp>
          <samp v-else style="color: red">驳回</samp>
        </template> -->
      </el-table-column>
      <el-table-column prop="bz" label="备注">
        <template slot-scope="scope">
          <span class="bz" :title="scope.row.bz">{{ scope.row.bz }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import API from "@/common/api";
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 10,
      tableData: [],
    };
  },
  props: {
    my: Boolean,
  },
  created() {
    this.upData(1);
  },
  methods: {
    dateFormat(row, column) {
      var date = new Date(row); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate();
      // var h = date.getHours() + "-";
      // var m = date.getMinutes() + "-";
      // var s = date.getSeconds();
      return Y + M + D;
    },
    upData({ currentPage = 1, applyTimeOrder, applyStatusOrder }) {
      // setTimeout(() => {
      // console.log("")  、、queryReq
      API.Demand.remove1({
        urlNmae: this.my ? "queryReq" : "deleteReq",
        currentPage: currentPage,
        pageSize: 10,
        applyTimeOrder,
        applyStatusOrder,
      }).then((data) => {
        const result = data.result;
        this.tableData = result.data;
        this.total = result.totalSize;
      });
      // this.tableData = [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1517 弄",
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1519 弄",
      //   },
      //   {
      //     date: "2016-05-03",
      //     name: "王小虎",
      //     address: "上海市普陀区金沙江路 1516 弄",
      //   },
      // ];
      // }, 800);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.upData({ currentPage: val });
      console.log(`当前页: ${val}`);
    },
    formatter(row, column) {
      return row.address;
    },
    sortChange({ prop, order }) {
      console.log(order);
      if (prop == "applyTime") {
        this.upData({
          currentPage: this.currentPage,
          applyTimeOrder: order == "descending" ? "desc" : "asc",
        });
      } else if (prop == "reviewedStatus") {
        this.upData({
          currentPage: this.currentPage,
          applyStatusOrder: order == "descending" ? "desc" : "asc",
        });
      }
    },
  },
};
</script>
<style scoped>
.bz {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
