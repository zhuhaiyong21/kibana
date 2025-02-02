/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BUCKET_TYPES, METRIC_TYPES } from '@kbn/data-plugin/common';
import { Operation } from '../../types';
import { Operations } from '../../constants';

interface Agg {
  isFormula?: false;
}
interface AggWithFormula {
  isFormula: true;
  formula: string;
}

export type AggOptions<T> = {
  isFullReference: boolean;
  isFieldRequired: boolean;
  supportedDataTypes: readonly string[];
} & (T extends Exclude<Operation, 'formula'> ? Agg : AggWithFormula);

// list of supported TSVB aggregation types in Lens
// some of them are supported on the quick functions tab and some of them
// are supported with formulas

export type Metric<T extends Operation | string> = { name: T } & AggOptions<T>;
interface LocalSupportedMetrics {
  [METRIC_TYPES.AVG]: Metric<typeof Operations.AVERAGE>;
  [METRIC_TYPES.CARDINALITY]: Metric<typeof Operations.UNIQUE_COUNT>;
  [METRIC_TYPES.MEDIAN]: Metric<typeof Operations.MEDIAN>;
  [METRIC_TYPES.COUNT]: Metric<typeof Operations.COUNT>;
  [METRIC_TYPES.DERIVATIVE]: Metric<typeof Operations.DIFFERENCES>;
  [METRIC_TYPES.CUMULATIVE_SUM]: Metric<typeof Operations.CUMULATIVE_SUM>;
  [METRIC_TYPES.AVG_BUCKET]: Metric<typeof Operations.FORMULA>;
  [METRIC_TYPES.MAX_BUCKET]: Metric<typeof Operations.FORMULA>;
  [METRIC_TYPES.MIN_BUCKET]: Metric<typeof Operations.FORMULA>;
  [METRIC_TYPES.SUM_BUCKET]: Metric<typeof Operations.FORMULA>;
  [METRIC_TYPES.MAX]: Metric<typeof Operations.MAX>;
  [METRIC_TYPES.MIN]: Metric<typeof Operations.MIN>;
  [METRIC_TYPES.SUM]: Metric<typeof Operations.SUM>;
  [METRIC_TYPES.VALUE_COUNT]: Metric<typeof Operations.COUNT>;
  [METRIC_TYPES.STD_DEV]: Metric<typeof Operations.STANDARD_DEVIATION>;
  [METRIC_TYPES.PERCENTILES]: Metric<typeof Operations.PERCENTILE>;
  [METRIC_TYPES.SINGLE_PERCENTILE]: Metric<typeof Operations.PERCENTILE>;
  [METRIC_TYPES.PERCENTILE_RANKS]: Metric<typeof Operations.PERCENTILE_RANK>;
  [METRIC_TYPES.SINGLE_PERCENTILE_RANK]: Metric<typeof Operations.PERCENTILE_RANK>;
  [METRIC_TYPES.TOP_HITS]: Metric<typeof Operations.LAST_VALUE>;
  [METRIC_TYPES.TOP_METRICS]: Metric<typeof Operations.LAST_VALUE>;
  [METRIC_TYPES.MOVING_FN]: Metric<typeof Operations.MOVING_AVERAGE>;
}

type UnsupportedSupportedMetrics = Exclude<
  METRIC_TYPES | BUCKET_TYPES,
  keyof LocalSupportedMetrics
>;
export type SupportedMetrics = LocalSupportedMetrics & {
  [Key in UnsupportedSupportedMetrics]?: null;
};

const supportedDataTypesWithDate = ['number', 'date', 'histogram'] as const;
const supportedDataTypes = ['number', 'histogram'] as const;
const extendedSupportedDataTypes = [
  'string',
  'boolean',
  'number',
  'number_range',
  'ip',
  'ip_range',
  'date',
  'date_range',
  'murmur3',
] as const;

export const SUPPORTED_METRICS: SupportedMetrics = {
  avg: {
    name: 'average',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes: ['number'],
  },
  cardinality: {
    name: 'unique_count',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes: extendedSupportedDataTypes,
  },
  count: {
    name: 'count',
    isFullReference: false,
    isFieldRequired: false,
    supportedDataTypes: [],
  },
  moving_avg: {
    name: 'moving_average',
    isFullReference: true,
    isFieldRequired: true,
    supportedDataTypes: ['number'],
  },
  derivative: {
    name: 'differences',
    isFullReference: true,
    isFieldRequired: true,
    supportedDataTypes: ['number'],
  },
  cumulative_sum: {
    name: 'cumulative_sum',
    isFullReference: true,
    isFieldRequired: true,
    supportedDataTypes: ['number'],
  },
  avg_bucket: {
    name: 'formula',
    isFullReference: true,
    isFieldRequired: true,
    isFormula: true,
    formula: 'overall_average',
    supportedDataTypes: ['number'],
  },
  max_bucket: {
    name: 'formula',
    isFullReference: true,
    isFieldRequired: true,
    isFormula: true,
    formula: 'overall_max',
    supportedDataTypes: ['number'],
  },
  min_bucket: {
    name: 'formula',
    isFullReference: true,
    isFieldRequired: true,
    isFormula: true,
    formula: 'overall_min',
    supportedDataTypes: ['number'],
  },
  sum_bucket: {
    name: 'formula',
    isFullReference: true,
    isFieldRequired: true,
    isFormula: true,
    formula: 'overall_sum',
    supportedDataTypes: ['number'],
  },
  max: {
    name: 'max',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes: supportedDataTypesWithDate,
  },
  min: {
    name: 'min',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes: supportedDataTypesWithDate,
  },
  percentiles: {
    name: 'percentile',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes,
  },
  single_percentile: {
    name: 'percentile',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes,
  },
  percentile_ranks: {
    name: 'percentile_rank',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes,
  },
  single_percentile_rank: {
    name: 'percentile_rank',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes,
  },
  sum: {
    name: 'sum',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes,
  },
  top_hits: {
    name: 'last_value',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes: extendedSupportedDataTypes,
  },
  top_metrics: {
    name: 'last_value',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes: extendedSupportedDataTypes,
  },
  value_count: {
    name: 'count',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes: extendedSupportedDataTypes,
  },
  std_dev: {
    name: 'standard_deviation',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes,
  },
  median: {
    name: 'median',
    isFullReference: false,
    isFieldRequired: true,
    supportedDataTypes,
  },
} as const;

type SupportedMetricsKeys = keyof LocalSupportedMetrics;

export type SupportedMetric = typeof SUPPORTED_METRICS[SupportedMetricsKeys];

export const getFormulaFromMetric = (metric: SupportedMetric) => {
  if (metric.isFormula) {
    return metric.formula;
  }
  return metric.name;
};
