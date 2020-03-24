<template>
    <div id="error">
        <div>
            <i class="fas fa-times"></i>
        </div>
        <div>
            <p><slot></slot></p>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#error {
    margin: 4em 0;
    display: flex;
    flex-direction: column;

    & > div {
        display: flex;
        justify-content: center;
    }
}

i, p {
    color: #b71c1c;
    text-align: center;
    font-size: 3em;
    font-weight: bold;
}

i {
    font-size: 5em;
}
</style>