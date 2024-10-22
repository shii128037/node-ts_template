/**
 * 請參考 human.ts 的語法完成 Rational 類
 */
export class Rational {
    private numerator: number;
    private denominator: number;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this.numerator = numerator;
        this.denominator = denominator;
        this.normalize();
    }

    // 取得分子
    getNumerator(): number {
        return this.numerator;
    }

    // 取得分母
    getDenominator(): number {
        return this.denominator;
    }

    // 將有理數化為最簡分數
    normalize(): Rational {
        const gcd = this.greatestCommonDivisor(this.numerator, this.denominator);
        this.numerator = this.numerator / gcd;
        this.denominator = this.denominator / gcd;
        return this;
    }

    // 計算最大公約數
    private greatestCommonDivisor(a: number, b: number): number {
        if (b === 0) {
            return a;
        }
        return this.greatestCommonDivisor(b, a % b);
    }

    // 檢查是否為整數
    isWhole(): boolean {
        return this.numerator % this.denominator === 0;
    }

    // 檢查是否為小數
    isDecimal(): boolean {
        return !this.isWhole();
    }

    // 檢查兩個有理數是否相等
    equals(numerator: number, denominator: number): boolean {
        const temp = new Rational(numerator, denominator);
        return this.numerator === temp.normalize().numerator &&
            this.denominator === temp.normalize().denominator;
    }

    // 檢查是否與另一個 Rational 物件相等
    equalsRational(r: Rational): boolean {
        return this.equals(r.getNumerator(), r.getDenominator());
    }

    // 將有理數轉為字串
    toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }

    // 解析字串陣列為 Rational 物件
    static parseRational(chars1: string[], chars2: string[]): Rational {
        const num = parseInt(chars1.join(''));
        const denom = parseInt(chars2.join(''));
        return new Rational(num, denom);
    }

    // 解析包含 '/' 的字串為 Rational 物件
    static parseRationalFromString(rationalStr: string): Rational {
        const parts = rationalStr.split('/').map(Number);
    
        // 確認 parts 是一個包含兩個數字的陣列
        if (!Array.isArray(parts) || parts.length !== 2) {
            throw new Error("Invalid rational format. Expected format: 'numerator/denominator'");
        }
    
        const num = parts[0];
        const denom = parts[1];
    
        // 檢查轉換結果，並確保分母不為0
        if (isNaN(num) || isNaN(denom) || denom === 0) {
            throw new Error("Invalid numbers or denominator is zero");
        }
    
        return new Rational(num, denom);
    }    
}
