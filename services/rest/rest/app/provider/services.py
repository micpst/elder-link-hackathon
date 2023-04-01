from decimal import Decimal
from typing import TypedDict

import numpy as np
import pandas as pd
from django.db.models import QuerySet, Case, When
from django.db import models


from rest.app.provider.models import Provider


class Filter(TypedDict):
    longitude: Decimal
    latitude: Decimal
    activities: list[str]


class MatchingService:
    @staticmethod
    def haversine(lat1, lon1, lat2, lon2) -> float:
        r = 6371  # Earth radius in kilometers

        lat1, lon1, lat2, lon2 = map(
            np.radians, [lat1, lon1, lat2, lon2]
        )  # Convert degrees to radians

        d_lat = lat2 - lat1
        d_lon = lon2 - lon1

        a = (
            np.sin(d_lat / 2) ** 2
            + np.cos(lat1) * np.cos(lat2) * np.sin(d_lon / 2) ** 2
        )
        c = 2 * np.arcsin(np.sqrt(a))

        distance = r * c  # Distance in kilometers

        return distance

    @classmethod
    def match(cls, filters: Filter) -> QuerySet:
        print(filters)
        providers = Provider.objects.all()
        print(providers)

        senior = pd.DataFrame(filters, index=[0])
        activities = senior['activities'].str.get_dummies(',')

        # join dummy columns to original dataframe
        senior = pd.concat([senior, activities], axis=1)
        print(senior)

        df = pd.DataFrame.from_records(providers.values())
        print(df)
        print("------------------------------")

        # create dummy columns
        dummies = pd.get_dummies(pd.DataFrame(df['activities'].tolist()).stack()).sum(level=0)

        # rename columns to original values
        dummies.columns = ['TRANSPORTATION', 'SHOPPING', 'HOME_VISIT', 'TECHNOLOGY_ASSISTANCE', 'MENTAL_HEALTH_SUPPORT']

        # join dummy columns to original dataframe
        df = pd.concat([df, dummies], axis=1)

        # df = pd.concat([df, dummies], axis=1)
        print(df)
        # print(df.HEAD())

        compare_cols = ['TRANSPORTATION', 'SHOPPING', 'HOME_VISIT', 'TECHNOLOGY_ASSISTANCE', 'MENTAL_HEALTH_SUPPORT']

        print("---------1")
        print(senior)
        for col in compare_cols:
            if col not in senior.columns:
                senior[col] = 0
        print(senior.info())
        print(senior)
        # Filter the rows of prov based on values in senior
        # filtered_prov = df[
        #     df.apply(
        #         lambda x: all(x[compare_cols] >= senior[compare_cols]), axis=1
        #     )
        # ]
        # Loop through each column and compare values
        filtered_prov = df.copy()
        for col in compare_cols:
            filtered_prov = filtered_prov[filtered_prov[col] >= senior[col].iloc[0]]
        print("---------1")
        print(filtered_prov)
        filtered_prov["distance"] = df.apply(
            lambda x: cls.haversine(
                float(x["latitude"]), float(x["longitude"]), float(senior["latitude"]), float(senior["longitude"])
            ),
            axis=1,
        )
        filtered_prov = filtered_prov[filtered_prov["distance"] <= 60] #filtered_prov["dis"]]
        filtered_prov["sum"] = filtered_prov[compare_cols].sum(axis=1)
        filtered_prov = filtered_prov.sort_values(by="sum", ascending=True)

        print("---------2")
        print(filtered_prov)

        ids = filtered_prov['id'].tolist()
        print(ids)
        # providers = Provider.objects.filter(id__in=ids)

        # Create a list of When expressions for each ID in the ids list
        when_list = [When(id=id_val, then=pos) for pos, id_val in enumerate(ids)]

        # Use the Case expression to order the Provider queryset by the order of IDs in the ids list
        providers = Provider.objects.filter(id__in=ids).order_by(Case(*when_list, output_field=models.IntegerField()))


        return providers
