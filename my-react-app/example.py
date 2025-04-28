import requests
from bs4 import BeautifulSoup

# Function to scrape data based on a dynamic search term
def scrape_data(search_term: str):
    # Construct the URL with the search term
    url = f'https://www.data.gov.in/search?title={search_term}&type=resources&sortby=_score'

    # Send a GET request to the page
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        # Parse the page content with BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find the relevant sections you want to scrape
        resources = soup.find_all('div', class_='grid-header')

        if resources:
            # Extracting the title and URL of each resource
            for resource in resources:
                title = resource.find('h3')
                if title:
                    print(f"Title: {title.get_text(strip=True)}")
                
                # Extract the anchor tag under the h3 within the div
                link = resource.find('a', href=True)
                if link:
                    # Make sure the link is complete, not a relative URL
                    full_link = link['href']
                    if not full_link.startswith('http'):
                        full_link = f"https://www.data.gov.in{full_link}"
                    print(f"URL: {full_link}")
                
                print('-' * 80)
        else:
            print(f"No resources found for the term '{search_term}'.")

    else:
        print(f"Failed to retrieve the page: {response.status_code}")

# Example usage: change the search term to anything you'd like
search_term = input("Enter search term (e.g., 'murder', 'abuse'): ")
scrape_data(search_term)
