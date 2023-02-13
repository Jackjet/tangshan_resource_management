<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      @sort-change="sortChange"
    >
      <el-table-column prop="date" label="序号">
      </el-table-column>
      <el-table-column prop="name" label="部门">
      </el-table-column>
      <el-table-column prop="address" label="信息资源名称" >
      </el-table-column>
      <el-table-column prop="address" label="信息项" >
      </el-table-column>
      <el-table-column prop="address" label="共享服务方式" >
      </el-table-column>
      <el-table-column prop="address" label="数据提供方式" >
      </el-table-column>
      <el-table-column prop="address" label="数据更新周期" >
      </el-table-column>
      <el-table-column prop="address" label="共享类型" >
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      total: 1000,
      pageSize: 10,
      tableData: [],
    };
  },
  created() {
    this.upData(1);
  },
  methods: {
    upData(currentPage) {
      setTimeout(() => {
        this.tableData = [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
          },
        ];
      }, 800);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.upData(val);
      console.log(`当前页: ${val}`);
    },
    formatter(row, column) {
      return row.address;
    },
    sortChange(ss) {
      console.log(ss);
    },
  },
};
</script>
