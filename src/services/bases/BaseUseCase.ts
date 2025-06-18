export abstract class BaseUseCase<IRequest, IResponse> {
  abstract execute(request: IRequest): Promise<IResponse>;

  run(request: IRequest): Promise<IResponse> {
    const startTime = performance.now();
    console.log(
      `UseCase ${this.constructor.name} started at ${new Date(
        startTime
      ).toISOString()}`
    );
    const result = this.execute(request);
    const endTime = performance.now();
    console.log(
      `UseCase ${this.constructor.name} finished at ${new Date(
        endTime
      ).toISOString()}`
    );
    return result;
  }
}
