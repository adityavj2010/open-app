import { Column } from 'typeorm';
import { Max, Min } from 'class-validator';

export class CreateBusinessServiceDto {
  bId: number;

  @Column({ nullable: false })
  serviceName: string;

  @Column({ nullable: false })
  @Min(1)
  @Max(60)
  time: number;

  @Column({ nullable: false })
  @Min(0)
  cost: number;

  @Column({ nullable: false })
  @Min(0)
  count: number;
}
