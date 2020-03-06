<template>
    <div>
        <form @submit="exec">
            <input type="text" placeholder="Search..." v-model="research">
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

<style lang="scss">
</style>