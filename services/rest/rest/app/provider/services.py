# import numpy as np
# class MatchingService:
#     def haversine(lat1, lon1, lat2, lon2):
#         R = 6371  # Earth radius in kilometers
#
#         lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])  # Convert degrees to radians
#
#         dlat = lat2 - lat1
#         dlon = lon2 - lon1
#
#         a = np.sin(dlat / 2) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2) ** 2
#         c = 2 * np.arcsin(np.sqrt(a))
#
#         distance = R * c  # Distance in kilometers
#
#         return distance
#
#     def match(senior):
#
#
#         compare_cols = ['m', 't']
#
#         # Filter the rows of prov based on values in senior
#         filtered_prov = prov[prov.apply(lambda x: all(x[compare_cols] >= senior.iloc[1][compare_cols]), axis=1)]
#         filtered_prov['distance'] = prov.apply(lambda x: haversine(x['lat'], x['lon'], senior['lat'].loc[0], senior['lon'].loc[0]), axis=1)
#         filtered_prov = filtered_prov[filtered_prov['distance']<=filtered_prov['dis']]
#         filtered_prov['sum'] = filtered_prov[compare_cols].sum(axis=1)
#         filtered_prov = filtered_prov.sort_values(by='sum', ascending=True)
#
#         filtered_prov
