import React from 'react'
import { Bar } from 'react-chartjs-2'

export default function Index({ bookings }) {
    const BOOKINGS_BUCKETS = {
        Cheap: {
            min: 0,
            max: 100
        },
        Normal: {
            min: 100,
            max: 200
        },
        Expensive: {
            min: 200,
            max: 100000
        }
    },
        chartData = { data: { labels: [], datasets: [] } }

    for (const bucket in BOOKINGS_BUCKETS) {
        const filteredBookingsCount = bookings.reduce((prev, current) => {
            if (current.price > BOOKINGS_BUCKETS[bucket].min && current.price < BOOKINGS_BUCKETS[bucket].max) {
                return prev + 1
            } else {
                return prev
            }
        }, 0)
        chartData.data.labels.push(bucket)
        chartData.data.datasets.push({
            label: "My First dataset",
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [filteredBookingsCount]
        })
    }

    return (
        <Bar data={chartData} />
    )
}
