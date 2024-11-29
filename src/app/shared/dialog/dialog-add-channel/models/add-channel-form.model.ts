import { FormControl } from "@angular/forms";
import { ChannelType } from "src/app/core/models/channel.model";

export interface AddChannelFormModel {
    name: FormControl<string>;
    type: FormControl<ChannelType>;
}