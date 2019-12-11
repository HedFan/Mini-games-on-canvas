<template>
    <div class="btn-box">
        <div class="inline">
            <a type="button" @click="redirectToGame('dxball')">DxBall</a>
            <a type="button" @click="redirectToGame('tennis')">Tennis</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'practice',
        methods: {
            redirectToGame(nameEl) {
                this.$router.push({name: nameEl});
            },
        },
    }
</script>


<style scoped>
    .btn-box {

    }
    .btn-box .inline {
        width: 300px;
        margin: 200px auto;
        display: flex;
        justify-content: space-around;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    a[type='button'] {
        padding: 8px 17px;
        border: 1px solid #42b983;
        border-radius: 5px;
        box-shadow: 1px 0px 5px 1px rgba(66, 185, 131, 0.35);
        text-align: center;
    }
    a[type='button']:hover, a[type='button']:active {
        box-shadow: 1px 0px 5px 1px rgba(66, 185, 131, 0.55);
    }
    .inline {
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;

    }
</style>
