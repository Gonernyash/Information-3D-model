import Structure from './Structure';

class Building extends Structure {
    constructor(sizeVector, posVector, color, opacity, options) {
        super(sizeVector, posVector, color, opacity, options);

        this.box = this.drawBox(sizeVector, posVector, color, opacity);
        this.objects.push(this.box);

        this.windowsCount1 = this.options.windowsCount1 ?? 0;
        this.windowsCount2 = this.options.windowsCount2 ?? 0;
        this.windowsCount3 = this.options.windowsCount3 ?? 0;
        this.windowsCount4 = this.options.windowsCount4 ?? 0;

        this.windowWidth = this.options.windowWidth ?? ((this.size.x > this.size.y) ? this.size.y / 4 : this.size.x / 4);
        this.windowHeight = this.options.windowHeight ?? this.size.z / 1.5;
        this.windowsTop = this.options.windowsTop ?? 0;

        this.drawBuildingWindows(this.windowsCount1, 1);
        this.drawBuildingWindows(this.windowsCount2, 2);
        this.drawBuildingWindows(this.windowsCount3, 3);
        this.drawBuildingWindows(this.windowsCount4, 4);

        this.outline = [this.box, this.windows, this.doors];

        if (this.events) {
            this.setHighlight();
            this.setInteraction();
            for (let eventName in this.events) {
                let handler = this.events[eventName];
                if (handler) {
                    this.interactionCube.cursor = 'pointer';
                    this.interactionCube.on(eventName, (event) => handler(event));
                }
            }
        }
    }

    drawBuildingWindows(count, wallID) {
        let between;
        if (wallID === 1 || wallID === 3) {
            between = (this.size.y - count * this.windowWidth) / (count + 1);
        } else if (wallID === 2 || wallID === 4) {
            between = (this.size.x - count * this.windowWidth) / (count + 1);
        } else {
            console.error('wrong wallID value');
            return undefined;
        }
        
        const pos = between;
        for (let i = 0; i < count; i++) {
            this.drawWindow(this.windowWidth, this.windowHeight, pos + i * (between + this.windowWidth), (this.size.z / 2) - (this.windowHeight / 2) + this.windowsTop, wallID);
        }
    }
}

export default Building