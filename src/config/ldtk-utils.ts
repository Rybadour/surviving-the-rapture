
export interface LDTKEntityInstance {
  __identifier: string;
  iid: string;
  width: number;
  height: number;
  defUid: number;
  px: number[];
  fieldInstances: {
    __identifier: string;
    __value: any;
    __type: string;
  }[];
}

export interface LDTKLevel {
  layerInstances: LDTKEntityLayer[];
}

export interface LDTKEntityLayer {
  __identifier: string;
  entityInstances: LDTKEntityInstance[];
}

export interface LDTKEntityReference {
  entityIid: string;
}

export function getEntityField(entity: LDTKEntityInstance, fieldName: string) {
  const field = entity.fieldInstances.filter((fi) => fi.__identifier == fieldName);
  return field.length > 0 ? field[0].__value : "";
}

export function getFields(entity: LDTKEntityInstance) {
  const fields: Record<string, any> = {};
  entity.fieldInstances.forEach((field) => {
    fields[field.__identifier] = field.__value;
  });
  return fields;
}

export function getRefFields(ref: LDTKEntityReference, layer: LDTKEntityLayer) {
  const found = layer.entityInstances.find(entity => entity.iid == ref.entityIid);
  return found ? getFields(found) : {};
}

export function getLayerByName(level: LDTKLevel, name: string) {
  return level.layerInstances.find(layer => layer.__identifier == name);
}