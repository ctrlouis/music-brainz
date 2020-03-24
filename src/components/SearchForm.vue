/*
* COMPONENT
* Research input
*/
<template>
    <div>
        <form @submit="exec">
            <input type="text" placeholder="Search..." v-model="research" autofocus>
            <button type="submit" class="button">Search</button>
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
            /*
            * start new research on click or at when 'enter' key is press
            *
            * @input => event: submit event trigger by the forms
            */
            event.preventDefault();
            if (this.research != "") {
                this.$emit('newSearch', this.research);
                this.clearForm();
            }
        },

        clearForm() {
            /*
            * clear input form
            */
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