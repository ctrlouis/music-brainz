<template>
    <div>
        <form @submit="exec">
            <input type="text" placeholder="Search..." v-model="research" autofocus>
            <select v-model="categorie">
                <option disabled value="">Toutes catégories</option>
                <option value="album">Albums</option>
                <option value="artist">Artists</option>
                <option value="track">Tracks</option>
            </select>
        </form>
    </div>
</template>

<script>
export default {
    name: 'app',

    data() {
        return {
            research: "",
            categorie: ""
        }
    },

    methods: {
        exec(event) {
            event.preventDefault();
            if (this.research != "") {
                this.$emit('newSearch', this.research);
                this.clearForm();
            }
        },

        clearForm() {
            this.research = "";
            this.categorie = "";
        }
    }
}
</script>

<style lang="scss" scoped>
div {
    text-align: center;
    margin-top: 2%;
}

input {
    font-weight: bold;
    border-radius: 8px;
    padding: 0.5%;
}
input:focus {
    border-color: #42b983;
}
input:focus::placeholder {
    color: darken($color: #42b983, $amount: 25)
}
</style>