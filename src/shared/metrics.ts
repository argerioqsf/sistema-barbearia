export type MetricName = string

export interface TrackMetricOptions {
  tags?: Record<string, string | number | boolean>
  value?: number
}

export function trackMetric(
  name: MetricName,
  options: TrackMetricOptions = {},
) {
  if (process.env.NODE_ENV !== 'production') {
    console.info('[metric]', name, options)
  }
  // Hook real APM/metrics providers here if needed.
}
