import { Pipe } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'isImage',
})
export class IsImagePipe {
    private imageExtensionTypes = ['.jpeg', '.png', '.gif'];

    transform(name: string): boolean {
        return !!this.imageExtensionTypes.find(ext => name.endsWith(ext));
    }
}