<template>
    <div class="home">
        <div class="flex">
            <part-one></part-one>
        </div>
        <div class="flex">
            <part-two></part-two>
        </div>
        <div class="flex">
            
        </div>
        <div class="flex">
            
        </div>
    </div>
</template>

<script>
import PartOne from '@/components/part1';
import PartTwo from '@/components/part2';
export default {
    name: "home",
    data(){
        return{
        }
    },
    components: {
        PartTwo,
        PartOne
    },
    
};
</script>
<style lang="less" scoped>
.home{
    display: flex;
    .flex{
        flex: 1;
        padding: 0 30px;
        min-height: 100vh;
        border-right: 1px solid #e6e6e6;
    }
}
</style>

