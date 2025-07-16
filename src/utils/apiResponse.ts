export class ApiResponse<T> {
    public success: boolean;
    constructor(
        public statusCode: number,
        public message: string,
        public data?: T | null,
    ) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data || null;
        this.success = statusCode < 400;
    }
}
