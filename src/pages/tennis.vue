<template>
    <div class="content">
        <h2>Tennis</h2>
        <a type="button" @click="redirectToGame('practice')">Back</a>
        <TennisGame></TennisGame>

    </div>
</template>

<script>
    import TennisGame from "./../components/TennisGame.vue";
    export default {
        name: "tennis",
        components: {
            TennisGame
        },
        methods: {
            redirectToGame(nameEl) {
                this.$router.push({name: nameEl});
            },
        },
    }
</script>

<style scoped>
    .content {
        text-align: center;
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
        cursor: pointer;
    }
    a[type='button']:hover, a[type='button']:active {
        box-shadow: 1px 0px 5px 1px rgba(66, 185, 131, 0.55);
    }
    h2 {
        margin-bottom: 15px;
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

    .bild {
        display: block;
    }

    .inline {
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;

    }
</style>