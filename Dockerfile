# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:lts as builder

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /app/

# Install all the dependencies
RUN npm ci --silent

# Generate the build of the application
RUN npx ng build --configuration production


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
# COPY --from=build /usr/local/app/dist/my-app/browser /usr/share/nginx/html
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder

RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/dist/my-app/browser /usr/share/nginx/html/
# COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 80
# EXPOSE 80

EXPOSE 80

