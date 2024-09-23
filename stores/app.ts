export const useAppStore = defineStore('app', {
    state: () => ({
        drawer: false,
        color: 'success',
    }),
    actions: {
        setDrawer(value: boolean) {
            this.drawer = value;
            console.log(this.drawer);
        },
        setColor(value: string) {
            this.color = value;
        },
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
    },
});
