
import { CRUDModel } from "fast-ui-builder";
import { FieldProps } from "fast-ui-builder";
// import { DynamicModelAction } from "fast-ui-builder";

export class Group extends CRUDModel<Group> {

    @FieldProps({ order: 1 })
    name!: string;

    @FieldProps({ order: 2 })
    code!: number;

    @FieldProps({ hidden: true })
    createdAt?: string;
    
}
