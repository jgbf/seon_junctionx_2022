const createDot = ({ size, color }) => ({
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    render: function () {
        const colorSchemes = {
            red: {
                dotColor: '231, 99, 95',
                areaColor: '227, 150, 148'
            },
            green: {
                dotColor: '96, 189, 178',
                areaColor: '138, 189, 183'
            }
        }
    
        const radius = (size / 2) * 0.3;
        const context = this.context;

        /* context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(${areaColor}, 1)`;
        context.fill();
 */
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(96, 189, 178, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * 1;
        context.fill();
        context.stroke();

        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height,
        ).data;

        return true;
    }
});