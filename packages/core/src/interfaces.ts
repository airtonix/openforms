
export declare type PrimitiveValue = string | number | boolean;
export declare type ComplexRecursiveValue = PrimitiveValue | HashedValue;
export declare type MaybeComplexRecursiveValue = undefined | ComplexRecursiveValue;
export declare type HashedValue = {
    [key: string]: MaybeComplexRecursiveValue | MaybeComplexRecursiveValue[];
};