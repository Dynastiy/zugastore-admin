<template>
    <div>
        <h3 class="font-weight-bold mb-5">
      Submissions
    </h3>
        <submission-table></submission-table>
    </div>
</template>

<script>
import SubmissionTable from "@/components/tables/submissions.vue"
export default {
    components:{
        SubmissionTable
    }
}
</script>